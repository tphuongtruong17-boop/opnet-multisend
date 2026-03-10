import { 
  Address, 
  Blockchain, 
  BytesWriter, 
  Revert,
  OP20,
  u256,
  SafeMath
} from '@btc-vision/btc-runtime/runtime';

@final
export class Multisend extends OP20 {
  
  public batchTransfer(
    recipients: Address[], 
    amounts: u256[]
  ): void {
    const len = recipients.length;
    
    if (len !== amounts.length) {
      throw new Revert('Length mismatch');
    }
    if (len === 0) {
      throw new Revert('Empty batch');
    }
    if (len > 100) {
      throw new Revert('Max 100 recipients');
    }

    const sender = Blockchain.msgSender;
    let totalAmount: u256 = u256.Zero;

    for (let i: i32 = 0; i < len; i++) {
      const amt = amounts[i];
      if (amt > u256.Zero) {
        totalAmount = SafeMath.add(totalAmount, amt);
      }
    }

    const senderBalance = this.balanceOfMap.get(sender);
    if (senderBalance < totalAmount) {
      throw new Revert('Insufficient balance');
    }

    this.balanceOfMap.set(sender, SafeMath.sub(senderBalance, totalAmount));

    for (let i: i32 = 0; i < len; i++) {
      const recipient = recipients[i];
      const amount = amounts[i];
      
      if (amount === u256.Zero) continue;
      
      const currentBalance = this.balanceOfMap.get(recipient);
      this.balanceOfMap.set(recipient, SafeMath.add(currentBalance, amount));
      this.createTransferEvent(sender, recipient, amount);
    }

    const writer = new BytesWriter(64);
    writer.writeAddress(sender);
    writer.writeU32(len);
    writer.writeU256(totalAmount);
    this.emitEvent('BatchTransfer', writer);
  }

  public getMaxRecipients(): u32 {
    return 100;
  }
}
