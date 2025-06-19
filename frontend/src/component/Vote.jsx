import { useVotingContract } from "../hooks/useVotingContract";
import { useState } from "react";

export default function Vote() {
  const { contract, isConnected } = useVotingContract();
  const [proposalId, setProposalId] = useState("");

  if (!isConnected) return null;

  const vote = async () => {
    await contract.vote(proposalId);
    alert("Vote cast!");
  };

  return (
    <div>
      <h3>Cast Your Vote</h3>
      <input
        placeholder="Proposal ID"
        value={proposalId}
        onChange={(e) => setProposalId(e.target.value)}
      />
      <button onClick={vote}>Vote</button>
    </div>
  );
}