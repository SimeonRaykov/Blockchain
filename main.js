const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(index, timestamp, data, previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash(){
        return SHA256(this.index, this.previousHash, this.timestamp + JSON.stringify(this.data).toString())
    }
}


class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock(){
        return new Block(0, new Date(), "Genesis", '');
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
}

const coinblockchain = new Blockchain();
coinblockchain.addBlock(new Block(1, new Date(), 11));
coinblockchain.addBlock(new Block(2, new Date(), 22));

console.log(JSON.stringify(coinblockchain, null, 4));