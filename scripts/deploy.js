async function main() {
  const SimpleVoting = await ethers.getContractFactory("SimpleVoting");
  const simpleVoting = await SimpleVoting.deploy();
  await simpleVoting.deployed();

  console.log("SimpleVoting deployed to:", simpleVoting.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});