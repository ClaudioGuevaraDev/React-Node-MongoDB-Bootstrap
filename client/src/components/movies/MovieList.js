import { RiAddCircleFill } from 'react-icons/ri'
import { Link } from 'react-router-dom'

const MovieList = () => {
    return (
        <div className="container p-4">
            <div className="row">
                <div className="col-md-3">
                    <Link to='/add-movie' className="btn btn-outline-success btn-sm">
                        <div className='row'>
                            <div className='d-flex align-items-center gap-2'>
                                <i className='fs-4 d-flex align-items-center'><RiAddCircleFill/></i> 
                                <span>AGREGAR PELÍCULA</span>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
            <div className="row row-cols-1 row-cols-md-3 g-4 mt-1 text-center">
                <div className="col">
                    <div className="card" style={{minHeight:"420px"}}>
                        <img src="https://i0.wp.com/hipertextual.com/wp-content/uploads/2021/11/doctor-strange-en-spider-man-no-way-home_2560x1440_8490.jpg?resize=780%2C439&ssl=1" className="img-fluid h-100 rounded-start" className="card-img-top img-fluid"/>
                        <div className="card-body d-flex flex-column justify-content-between">
                            <h5 className="card-title fw-bold">Spiderman No Way Home</h5>
                            <p className="card-text fst-italic">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is.
                            </p>
                            <div className="d-flex justify-content-around">
                                <button className="btn btn-outline-warning fw-bold btn-sm">EDITAR</button>
                                <button className="btn btn-outline-danger fw-bold btn-sm">ELIMINAR</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card" style={{minHeight:"420px"}}>
                        <img src="https://i0.wp.com/hipertextual.com/wp-content/uploads/2021/11/doctor-strange-en-spider-man-no-way-home_2560x1440_8490.jpg?resize=780%2C439&ssl=1" className="img-fluid h-100 rounded-start" className="card-img-top img-fluid"/>
                        <div className="card-body d-flex flex-column justify-content-between">
                            <h5 className="card-title fw-bold">Spiderman No Way Homeooooooo</h5>
                            <p className="card-text fst-italic">
                            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that
                            </p>
                            <div className="d-flex justify-content-around">
                                <button className="btn btn-warning fw-bold">EDITAR</button>
                                <button className="btn btn-danger fw-bold">ELIMINAR</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card" style={{minHeight:"420px"}}>
                        <img src="https://i0.wp.com/hipertextual.com/wp-content/uploads/2021/11/doctor-strange-en-spider-man-no-way-home_2560x1440_8490.jpg?resize=780%2C439&ssl=1" className="img-fluid h-100 rounded-start" className="card-img-top img-fluid"/>
                        <div className="card-body d-flex flex-column justify-content-between">
                            <h5 className="card-title fw-bold">Spiderman No Way Home</h5>
                            <p className="card-text">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                            </p>
                            <div className="d-flex justify-content-around">
                                <button className="btn btn-warning fw-bold">EDITAR</button>
                                <button className="btn btn-danger fw-bold">ELIMINAR</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card" style={{minHeight:"420px"}}>
                        <img src="https://i0.wp.com/hipertextual.com/wp-content/uploads/2021/11/doctor-strange-en-spider-man-no-way-home_2560x1440_8490.jpg?resize=780%2C439&ssl=1" className="img-fluid h-100 rounded-start" className="card-img-top img-fluid"/>
                        <div className="card-body d-flex flex-column justify-content-between">
                            <h5 className="card-title fw-bold">Spiderman No Way Home</h5>
                            <p className="card-text">
                                Lorem Ipsum 
                            </p>
                            <div className="d-flex justify-content-around">
                                <button className="btn btn-warning fw-bold">EDITAR</button>
                                <button className="btn btn-danger fw-bold">ELIMINAR</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieList