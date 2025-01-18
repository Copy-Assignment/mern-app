import { useState, useEffect } from "react";
import axios from 'axios';
// this is qodo cover
function App() {

  const { innerWidth: width, innerHeight: height } = window;
  const [isDesktop, setDesktop] = useState(window.innerWidth > 1450);
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  // const [isLoading, setLoading] = useState(false)
  function HandleChange(event) {
    setQuestion(event.target.value.slice(0, 250))
    if (event.target.value.length >= 250) {
      window.alert("Question length should not exceed 250 characters")
    }
    setQuestion(event.target.value.slice(0, 250))
  }

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });
  const updateMedia = () => {
    setDesktop(window.innerWidth > 1150);
  };

  const HandleSubmit = () => {
    // setLoading(true);
    if (question.trim().length < 8) {
      window.alert("Question length should not be less than 8 characters")
    }
    axios
      .post('http://localhost:5000', { question: question.trim() })
      .then((data) => {
        setAnswer(data.data)
      })
      .catch(err => {
        console.error(err);
      });
  }

  return (
    <div className="App">

      {
        isDesktop ?
          // for desktop start
          <div style={{ width: '100%', height: '100%' }}>
            <h1 style={{ width: '100%', textAlign: 'center', paddingTop: '3%' }}>Ask your questions from Holy Quran</h1>

            <hr style={{ width: '100%', backgroundColor: 'black', height: 3 }} />
            <div style={{ width: '70%', height: height * .5, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignContent: 'center', margin: 'auto' }}>

              <div style={{ width: '50%', height: '100%', margin: 'auto', border: '0', padding: '0' }}>
                <h2>Your question</h2>
                <textarea value={question} onChange={HandleChange} style={{ width: '100%', height: '85%', maxHeight: '85%', minHeight: '85%', padding: 20 }} />
              </div>

              <div style={{ width: '50%', height: '100%', margin: 'auto', border: '0', padding: '0' }}>
                <h2>Answer</h2>
                <textarea value={answer} disabled style={{ width: '100%', height: '85%', maxHeight: '85%', minHeight: '85%', padding: 20 }} />
              </div>

            </div>
            <button type="button" style={{ display: 'flex', width: 'auto', margin: '10px auto', border: '2px black solid', padding: '10px' }} onClick={HandleSubmit}>Ask now</button>
          </div> :
          <div style={{ width: '100%', height: '100%' }}>
            <h1 style={{ width: '100%', textAlign: 'center', paddingTop: '3%' }}>Ask your questions from Shree Krishna</h1>

            <hr style={{ width: '100%', backgroundColor: 'black', height: 3 }} />
            <div style={{ width: '100%', height: height * .9, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignContent: 'center', margin: 'auto', flexDirection: 'column' }}>

              <div style={{ width: 'auto', minWidth: '50%', height: '40%' }}>
                <h2>Your question</h2>
                <textarea value={question} onChange={HandleChange} style={{ width: '100%', height: '85%', maxHeight: '85%', minHeight: '85%', padding: 20 }} />
              </div>

              <div style={{ width: 'auto', minWidth: '50%', height: '40%' }}>
                <h2>Answer</h2>
                <textarea value={answer} disabled style={{ width: '100%', height: '85%', maxHeight: '85%', minHeight: '85%', padding: 20 }} />
              </div>

            </div>
            <button type="button" style={{ display: 'flex', width: 'auto', margin: '10px auto', border: '2px black solid', padding: '10px' }} onClick={HandleSubmit}>Ask now</button>
          </div>
      }
    </div>
  );
}

export default App;
