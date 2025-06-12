import { useVotingContract } from "../hooks/useVotingContract";

export default function StatusDisplay() {
  const { contract, address, isConnected, isAdmin } = useVotingContract();

  const [status, setStatus] = useState("");

  useEffect(() => {
    async function getStatus() {
      if (!contract) return;
      const rawStatus = await contract.getWorkflowStatus();
      const statuses = [
        "Registering Voters",
        "Proposals Registration Started",
        "Proposals Registration Ended",
        "Voting Session Started",
        "Voting Session Ended",
        "Votes Tallied"
      ];
      setStatus(statuses[rawStatus]);
    }

    getStatus();
  }, [contract]);

  return (
    <div>
      <h2>Current Status: {status}</h2>
      {isConnected && <p>Connected as: {address}</p>}
      {isAdmin && <p>✅ You are the administrator.</p>}
    </div>
  );
}