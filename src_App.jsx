import "./App.css";
import StatusDisplay from "./components/StatusDisplay";
import VoterRegistration from "./components/VoterRegistration";
import ProposalRegistration from "./components/ProposalRegistration";
import Vote from "./components/Vote";
import Results from "./components/Results";

function App() {
  return (
    <div className="App">
      <h1>Simple Voting DApp</h1>
      <StatusDisplay />
      <VoterRegistration />
      <ProposalRegistration />
      <Vote />
      <Results />
    </div>
  );
}

export default App;