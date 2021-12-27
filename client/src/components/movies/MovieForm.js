import Navbar from "../Navbar/Navbar"

const MovieForm = () => {
    return (
        <div>
            <Navbar/>
            <div className="container p-4">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-header">
                                <h1 className="card-title h4 text-center">Agregar una nueva película</h1>
                            </div>
                            <div className="card-body">
                                <form>
                                    <div className="mb-3">
                                        <input type="text" className="form-control" placeholder="Título" autoFocus/>
                                    </div>
                                    <div className="mb-3">
                                        <textarea placeholder="Descripción" rows={4} className="form-control"/>
                                    </div>
                                    <div className="mb-3">
                                        <input type="file" className="form-control"/>
                                    </div>
                                    <div className="hstack gap-3">
                                        <button className="btn btn-primary w-50">Crear</button>
                                        <button className="btn btn-danger w-50">Cancelar</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieForm