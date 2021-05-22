function home(){
    return (
        <div className="jumbotron">
            <h1 className="display-3">Bem vindo!</h1>
            <p className="lead">
                Bem vindo(a), {localStorage.getItem('USER_NAME')}! Utilize a barra de navegação para começar.
            </p>
        </div>
    )
}

export default home