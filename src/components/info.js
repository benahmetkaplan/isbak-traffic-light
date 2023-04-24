function Info(props) {
    const activeStep = props.activeStep;
    const countdownVal = props.countdownVal;
    return (
        <div className="col-md-12 mt-5">
        <span className={`info-area ${countdownVal !== "" && activeStep !== "" ? '' : 'hidden'}`}>
          Geri Sayım: <strong>{countdownVal}</strong><br/>
          Aktif Adım: <strong>{activeStep}</strong>
        </span>
      </div>
    );
}

export default Info;