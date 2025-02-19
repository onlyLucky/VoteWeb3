const { expect } = require("chai");

describe("Voting", function () {
    it("Should return the correct total votes for a candidate", async function () {
        const candidates = ["Candidate1", "Candidate2", "Candidate3"].map(c => ethers.utils.formatBytes32String(c));
        const Voting = await ethers.getContractFactory("Voting");
        const voting = await Voting.deploy(candidates);

        await voting.deployed();

        await voting.voteForCandidate(candidates[0]);
        await voting.voteForCandidate(candidates[0]);
        await voting.voteForCandidate(candidates[1]);

        expect(await voting.totalVotesFor(candidates[0])).to.equal(2);
        expect(await voting.totalVotesFor(candidates[1])).to.equal(1);
        expect(await voting.totalVotesFor(candidates[2])).to.equal(0);
    });
});