import './App.css';

import { useState } from 'react';

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
  const [lightOne, setLightOne] = useState("");
  const [lightTwo, setLightTwo] = useState("");
  const [lightThree, setLightThree] = useState("");  
  const [countdownVal, setCountdownVal] = useState("");
  const [activeStep, setActiveStep] = useState("");
  
  const handleSubmit = (event) => {
    event.preventDefault();
    lightingEvent((time, count) => {
      setTimeout(() => {
        setLightOne("");          
        setLightTwo("");          
        setLightThree("");
        setCountdownVal("");
        setActiveStep("");
      }, count * time * 1000);
    });
  };
  
  const lightingEvent = async (callback) => {
    await setActiveStep(1);
    await countDown(15, setCountdownVal);
    await setLightThree("green");
    await setLightOne("yellow");
    await setLightTwo("yellow");
    await setTimeout(async () => {
      await setLightOne("red");
      await setLightTwo("red");
    }, 7500);
    await setTimeout(async () => {
      for (let index = 0; index < steps.length; index++) {       
        let item = steps[steps.length - index - 1];
        let time = item.filter(x => x === "green") !== undefined ? greenTime : 5;
        await setTimeout(async () => {
          await setActiveStep(index + 1);
          await countDown(time, setCountdownVal);       
          await setLightOne(item[0]);          
          await setLightTwo(item[1]);          
          await setLightThree(item[2]);
          if(time > 5){
            if(item[0] === "red" || item[0] === "yellow"){
              setTimeout(() => {
                setLightOne("");
              }, 5000);
            }
            if(item[1] === "red" || item[1] === "yellow"){
              setTimeout(() => {
                setLightTwo("");
              }, 5000);
            }
            if(item[2] === "red" || item[2] === "yellow"){
              setTimeout(() => {
                setLightThree("");
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
          <div className="col-md-4 d-flex flex-column text-center">
            <div className={`traffic-light shape ${lightOne}`}>
              <div className="shadow"></div>
              <div className="light red"></div>
              <div className="light yellow"></div>
              <div className="light green"></div>
            </div>
            <span className="mt-2">Grup 1</span>
          </div>
          <div className="col-md-4 d-flex flex-column text-center">
            <div className={`traffic-light shape ${lightTwo}`}>
              <div className="shadow"></div>
              <div className="light red"></div>
              <div className="light yellow"></div>
              <div className="light green"></div>
            </div>
            <span className="mt-2">Grup 2</span>
          </div>
          <div className="col-md-4 d-flex flex-column text-center">
            <div className={`traffic-light shape ${lightThree}`}>
              <div className="shadow"></div>
              <div className="light red"></div>
              <div className="light yellow"></div>
              <div className="light green"></div>
            </div>
            <span className="mt-2">Yaya Grubu</span>
          </div>          
          <div className="col-md-12 mt-5">
            <span className={`countdown-area ${countdownVal !== "" && activeStep !== "" ? '' : 'hidden'}`}>
              Geri Sayım: <strong>{countdownVal}</strong><br/>
              Aktif Adım: <strong>{activeStep}</strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
