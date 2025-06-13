import { useVotingContract } from "../hooks/useVotingContract";
import { useState } from "react";

export default function VoterRegistration() {
  const { contract, isConnected, isAdmin } = useVotingContract();
  const [address, setAddress] = useState("");

  if (!isConnected || !isAdmin) return null;

  const register = async () => {
    await contract.registerVoter(address);
    alert("Voter registered!");
  };

  return (
    <div>
      <h3>Register Voter</h3>
      <input
        placeholder="Enter voter address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button onClick={register}>Register</button>
    </div>
  );
}