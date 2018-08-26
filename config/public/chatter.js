console.log("This is chatter!");
console.warn("JUst to tsee if it works");
let encryptMessage = message => {
    // etc
openpgp.initWorker({ path:'openpgp.worker.min.js' }) // set the relative web worker path
var options, encrypted;

options = {
    message: openpgp.message.fromBinary(new Uint8Array([0x01, 0x01, 0x01])), // input as Message object
    passwords: ['secret stuff'],                                             // multiple passwords possible
    armor: false                                                             // don't ASCII armor (for Uint8Array output)
};

let keyOptions = {
    numBits: 2048,
    passphrase: "secret-passphrase"
    //you would get the passphrase from an input field normally
};
let user = {};
openpgp.generateKey(keyOptions)
    .then((key) => {
        user.privateKey = key.privateKeyArmored;
        user.publicKey = key.publicKeyArmored;
        console.log(user.publicKey);
    });

openpgp.encrypt(options).then(function(ciphertext) {
    encrypted = ciphertext.message.packets.write(); // get raw encrypted packets as Uint8Array
    console.log(encrypted);
});
    return "1 encrypt";
}
