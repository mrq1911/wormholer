import {getEmitterAddressEth, getSignedVAA} from "@certusone/wormhole-sdk";

const toHex = (bytes) => Buffer.from(bytes).toString('hex');

async function main() {
  const rpcHost = "https://wormhole-v2-mainnet-api.certus.one";
  const emitterChain = 2;
  const emitterAddress = getEmitterAddressEth("0x3ee18b2214aff97000d974cf647e7c347e8fa585");

  const sequences = ["100523", "100524"];

  const vaa = await Promise.all(sequences.map((sequence) => getSignedVAA(rpcHost, emitterChain, emitterAddress, sequence)));

  vaa.forEach(({vaaBytes}) => console.log(toHex(vaaBytes)));
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});