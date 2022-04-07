const ForgotPassword = (props) => {
    return(
        <div>
            <div style = {{textAlign: "center"}}>
                <button onClick={props.goToLogin}>Back</button>
            </div>
        </div>
    )
}

export default ForgotPassword;