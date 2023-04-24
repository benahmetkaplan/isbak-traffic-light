import './App.css';
import { useState } from 'react';
import Light from './components/light';
import Info from './components/info';

function App() {
  
  const steps = [
    ['red', 'red', 'red'],
    ['green', 'red', 'red'],
    ['yellow', 'red', 'red'],
    ['red', 'green', 'red'],
    ['red', 'yellow', 'red'],
    ['red', 'red', 'red']
  ];
  
  const [greenTime, setGreenTime] = useState("Yeşil Süresi");  
  const [lights, setLights] = useState({
    groupOne: '',
    groupTwo: '',
    groupThree: ''
  });
  const [countdownVal, setCountdownVal] = useState("");
  const [activeStep, setActiveStep] = useState("");
  
  const handleSubmit = (event) => {
    event.preventDefault();
    lightingEvent((time, count) => {
      setTimeout(() => {
        setLights({
          groupOne: '',
          groupTwo: '',
          groupThree: ''
        });
        setCountdownVal("");
        setActiveStep("");
      }, count * time * 1000);
    });
  };
  
  const lightingEvent = async (callback) => {
    await setActiveStep(1);
    await countDown(15, setCountdownVal);
    await setLights({
      groupOne: 'yellow',
      groupTwo: 'yellow',
      groupThree: 'green'
    });
    await setTimeout(async () => {
      await setLights({        
        groupOne: 'red',
        groupTwo: 'red',
        groupThree: 'green'
      });
    }, 7500);
    await setTimeout(async () => {
      for (let index = 0; index < steps.length; index++) {       
        let item = steps[steps.length - index - 1];
        let time = item.filter(x => x === "green") !== undefined ? greenTime : 5;
        await setTimeout(async () => {
          await setActiveStep(index + 1);
          await countDown(time, setCountdownVal);       
          await setLights({
            groupOne: item[0],
            groupTwo: item[1],
            groupThree: item[2]
          });
          if(time > 5){
            if(item[0] === "red" || item[0] === "yellow"){
              setTimeout(() => {
                setLights({
                  groupOne: "",
                  groupTwo: lights.groupTwo,
                  groupThree: lights.groupThree
                });
              }, 5000);
            }
            if(item[1] === "red" || item[1] === "yellow"){
              setTimeout(() => {
                setLights({
                  groupOne: lights.groupOne,
                  groupTwo: "",
                  groupThree: lights.groupThree
                });
              }, 5000);
            }
            if(item[2] === "red" || item[2] === "yellow"){
              setTimeout(() => {
                setLights({
                  groupOne: lights.groupOne,
                  groupTwo: lights.groupTwo,
                  groupThree: ""
                });
              }, 5000);
            }
          }
        }, index * (time * 1000));
        if(index === 0){
          callback(time, steps.length);
        }
      }
    }, 15000);
  };
  
  const handleChange = (event) => {
    if(event.target.value > 30){
      setGreenTime(30);
    }else if(event.target.value < 1){
      setGreenTime(1);
    }else{
      setGreenTime(event.target.value);
    }    
  };
    
  const countDown = (counter, set) => {
    set(counter);
    let id = setInterval(function() {
      counter--;
      if(counter <= 0) {
        clearInterval(id);
      } else {
        set(counter);
      }
    }, 1000);
  };

  return (
    <div className="light-area">
      <div className="container">
        <div className="row">
          <div className="col-md-12 mb-5">
            <form className="form-inline" onSubmit={handleSubmit}>
              <div className="input-group">
                <input type="number" min="1" max="30" className="form-control" placeholder="Yeşil Süresi" onChange={handleChange} value={greenTime} />
                <div className="input-group-append">
                  <input className="btn btn-success" type="submit" value="Yaya Butonu" />
                </div>
              </div>
            </form>
          </div>
          <Light title="Grup 1" className={lights.groupOne}></Light>
          <Light title="Grup 2" className={lights.groupTwo}></Light>
          <Light title="Yaya Grubu" className={lights.groupThree}></Light>          
          <Info activeStep={activeStep} countdownVal={countdownVal}></Info>
        </div>
      </div>
    </div>
  );
}

export default App;