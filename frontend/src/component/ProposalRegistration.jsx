import { useVotingContract } from "../hooks/useVotingContract";
import { useState } from "react";

export default function ProposalRegistration() {
  const { contract, isConnected } = useVotingContract();
  const [description, setDescription] = useState("");

  if (!isConnected) return null;

  const submit = async () => {
    await contract.registerProposal(description);
    alert("Proposal submitted!");
  };

  return (
    <div>
      <h3>Submit Proposal</h3>
      <input
        placeholder="Proposal description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={submit}>Submit</button>
    </div>
  );
}