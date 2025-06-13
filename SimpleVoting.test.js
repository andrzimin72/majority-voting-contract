const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SimpleVoting", function () {
  let SimpleVoting, simpleVoting, owner, voter1, voter2;

  beforeEach(async function () {
    [owner, voter1, voter2] = await ethers.getSigners();
    SimpleVoting = await ethers.getContractFactory("SimpleVoting");
    simpleVoting = await SimpleVoting.deploy();
    await simpleVoting.deployed();
  });

  it("should register a voter", async function () {
    await simpleVoting.connect(owner).registerVoter(voter1.address);
    expect(await simpleVoting.isRegisteredVoter(voter1.address)).to.equal(true);
  });

  it("should not allow non-admin to register voters", async function () {
    await expect(
      simpleVoting.connect(voter1).registerVoter(voter2.address)
    ).to.be.revertedWithCustomError(simpleVoting, "NotAdministrator");
  });

  it("should allow registered voter to submit proposal", async function () {
    await simpleVoting.connect(owner).registerVoter(voter1.address);
    await simpleVoting.connect(owner).startProposalsRegistration();

    await simpleVoting.connect(voter1).registerProposal("Proposal 1");
    expect(await simpleVoting.getProposalsNumber()).to.equal(1);
  });

  it("should not allow voting before session starts", async function () {
    await simpleVoting.connect(owner).registerVoter(voter1.address);
    await simpleVoting.connect(owner).startProposalsRegistration();
    await simpleVoting.connect(voter1).registerProposal("Proposal 1");
    await simpleVoting.connect(owner).endProposalsRegistration();

    await expect(
      simpleVoting.connect(voter1).vote(0)
    ).to.be.revertedWithCustomError(simpleVoting, "InvalidStage");
  });

  it("should tally votes correctly", async function () {
    await simpleVoting.connect(owner).registerVoter(voter1.address);
    await simpleVoting.connect(owner).registerVoter(voter2.address);

    await simpleVoting.connect(owner).startProposalsRegistration();
    await simpleVoting.connect(voter1).registerProposal("Proposal A");
    await simpleVoting.connect(voter2).registerProposal("Proposal B");
    await simpleVoting.connect(owner).endProposalsRegistration();

    await simpleVoting.connect(owner).startVotingSession();
    await simpleVoting.connect(voter1).vote(0);
    await simpleVoting.connect(voter2).vote(1);
    await simpleVoting.connect(owner).endVotingSession();

    await simpleVoting.connect(owner).tallyVotes();

    expect(await simpleVoting.getWinningProposalId()).to.equal(0); // depends on tie-breaking logic
  });
});