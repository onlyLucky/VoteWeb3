const { ethers } = require("hardhat");

async function main() {
    const candidates = ["Candidate1", "Candidate2", "Candidate3"].map(c => ethers.utils.formatBytes32String(c));
    const Voting = await ethers.getContractFactory("Voting");
    const voting = await Voting.deploy(candidates);

    await voting.deployed();

    console.log("Voting deployed to:", voting.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});