import { useVotingContract } from "../hooks/useVotingContract";

export default function Results() {
  const { contract, isConnected, isAdmin } = useVotingContract();

  if (!isConnected || !isAdmin) return null;

  const tally = async () => {
    await contract.tallyVotes();
    alert("Votes tallied!");
  };

  return (
    <div>
      <h3>Tally Votes</h3>
      <button onClick={tally}>Tally Now</button>
    </div>
  );
}