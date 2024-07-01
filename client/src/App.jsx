
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Registrar los componentes de Chart.js que se utilizarán
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Hacer importes nuevos aquí
import { useState } from 'react';
import axios from 'axios';

function App() {

  // ----------------- Tabla de Sensores ------------
  const [upData, setupData] = useState({
    "Temperatura": 0,
    "Humedad": 0,
    "Velocidad": 0,
    "Luminocidad": 0,
    "Calidad_Aire": 0,
    "Barometro": 0,
  });

  const fetchDataClick = (url) => {
    axios.get(url)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Hubo un error!', error);
        // Manejar el error aquí, como mostrar un mensaje de error
      });
  };


  // ----------------- Codigo de los sensores ------------
  const [selectedSensor, setSelectedSensor] = useState("12");

  const handleSelectChange = (event) => {
    setSelectedSensor(event.target.value);
  };

  const handleButtonClick = (url) => {
    axios.post(url, {
      sensor: selectedSensor
    })
      .then(response => {
        console.log(response.data);
        // Manejar la respuesta aquí, como mostrar un mensaje de éxito
      })
      .catch(error => {
        console.error('Hubo un error!', error);
        // Manejar el error aquí, como mostrar un mensaje de error
      });
  };

  // ----------------- Codigo de la Tabla ----------------
  const [calData, setData] = useState({
    "Promedio": 0,
    "Mediana": 0,
    "DesEstandar": 0,
    "Max": 0,
    "Min": 0,
    "Moda": 0,
    "Conteo": 0,
    "Conteo1": 0,
    "Conteo0": 0,
  });

  const handleButtonUpdate = (url) => {
    axios.get(url)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Hubo un error!', error);
        // Manejar el error aquí, como mostrar un mensaje de error
      });
  };

  // ----------------- Graphic Interface -----------------
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  const fetchDataGraf = (url) => {
    axios.get(url)
      .then(response => {
        setChartData(response.data);
      })
      .catch(error => {
        console.error('Hubo un error!', error);
        // Manejar el error aquí, como mostrar un mensaje de error
      });
  };

  const chartOptions = {
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
        labels: {
          font: {
            weight: 'normal',
          },
        },
      },
      title: {
        display: true,
        text: 'Revenue',
        font: {
          weight: 'bold',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            weight: 'normal',
          },
        },
      },
      y: {
        ticks: {
          font: {
            weight: 'normal',
          },
        },
      },
    },
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg fixed-top bg-secondary text-uppercase" id="mainNav">
        <div className="container"><a className="navbar-brand" href="#page-top">SMART BASE</a><button data-bs-toggle="collapse" data-bs-target="#navbarResponsive" className="navbar-toggler text-white bg-primary text-uppercase rounded" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><i className="fa fa-bars"></i></button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item mx-0 mx-lg-1"></li>
              <li className="nav-item mx-0 mx-lg-1"></li>
              <li className="nav-item mx-0 mx-lg-1"></li>
            </ul>
          </div>
        </div>
      </nav>

      <header className="text-center text-white bg-primary masthead" style={{ background: 'rgb(194,43,125)', '--bs-primary': '#bc187a', '--bs-primary-rgb': '188,24,122' }}>
        <div className="container">
          <img className="img-fluid d-block mx-auto mb-5" src="./src/assets/img/OIP.png" style={{ borderStyle: 'none', borderRadius: '91px' }} alt="Logo" />
          <h1>DOME HOUSE</h1>
          <hr className="star-light" />
          <h2 className="fw-light mb-0">Automated - Safety - Efficiency</h2>
        </div>
      </header>

      <section id="portfolio" className="portfolio">
        <div className="container">
          <h2 className="text-uppercase text-center text-secondary">Sensores</h2>
          <hr className="star-dark mb-5" />
          <div className="row">
            <div className="col-md-6 col-lg-12 offset-lg-0">
              <h4>Estado Actual</h4>
              <form>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Sensores</th>
                        <th>Estados</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <i className="fa fa-thermometer-empty" style={{ fontSize: '20px', width: '18px', margin: '5px' }}></i>
                          Temperatura
                        </td>
                        <td>{upData.Temperatura}</td>
                      </tr>
                      <tr>
                        <td>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1em"
                            height="1em"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                            className="bi bi-water"
                            style={{ width: '20px', fontSize: '20px', margin: '5px' }}
                          >
                            <path d="M.036 3.314a.5.5 0 0 1 .65-.278l1.757.703a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.757-.703a.5.5 0 1 1 .372.928l-1.758.703a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0L.314 3.964a.5.5 0 0 1-.278-.65zm0 3a.5.5 0 0 1 .65-.278l1.757.703a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.757-.703a.5.5 0 1 1 .372.928l-1.758.703a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0L.314 6.964a.5.5 0 0 1-.278-.65zm0 3a.5.5 0 0 1 .65-.278l1.757.703a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.757-.703a.5.5 0 1 1 .372.928l-1.758.703a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0L.314 9.964a.5.5 0 0 1-.278-.65zm0 3a.5.5 0 0 1 .65-.278l1.757.703a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.757-.703a.5.5 0 1 1 .372.928l-1.758.703a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0L.314 12.964a.5.5 0 0 1-.278-.65z"></path>
                          </svg>
                          Humedad
                        </td>
                        <td>{upData.Humedad}</td>
                      </tr>
                      <tr>
                        <td>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1em"
                            height="1em"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                            className="bi bi-wind"
                            style={{ margin: '5px', width: '20px', fontSize: '20px' }}
                          >
                            <path d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5m-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2M0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5"></path>
                          </svg>
                          Velocidad
                        </td>
                        <td>{upData.Velocidad}</td>
                      </tr>
                      <tr>
                        <td>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1em"
                            height="1em"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                            className="bi bi-lightning-charge"
                            style={{ fontSize: '20px' }}
                          >
                            <path d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09zM4.157 8.5H7a.5.5 0 0 1 .478.647L6.11 13.59l5.732-6.09H9a.5.5 0 0 1-.478-.647L9.89 2.41z"></path>
                          </svg>
                          Luminocidad
                        </td>
                        <td>{upData.Luminocidad}</td>
                      </tr>
                      <tr>
                        <td>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1em"
                            height="1em"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                            className="bi bi-cloud-haze2-fill"
                            style={{ fontSize: '20px', width: '30px' }}
                          >
                            <path d="M8.5 2a5.001 5.001 0 0 1 4.905 4.027A3 3 0 0 1 13 12H3.5A3.5 3.5 0 0 1 .035 9H5.5a.5.5 0 0 0 0-1H.035a3.5 3.5 0 0 1 3.871-2.977A5.001 5.001 0 0 1 8.5 2m-6 8a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1zM0 13.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5"></path>
                          </svg>
                          Calidad de Aire
                        </td>
                        <td>{upData.Calidad_Aire}</td>
                      </tr>
                      <tr>
                        <td>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1em"
                            height="1em"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                            className="bi bi-person-lines-fill"
                            style={{ fontSize: '20px', width: '30px' }}
                          >
                            <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z"></path>
                          </svg>
                          Barometro
                        </td>
                        <td>{upData.Barometro}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <button
                  className="btn btn-primary"
                  type="button"
                  style={{ background: 'rgb(188,132,24)', width: '103.675px', height: '39.2px', margin: '5px' }}
                  onClick={() => handleButtonUpdate('http://127.0.0.1:8000/api/update')}
                >
                  Actualizar
                </button>
              </form>
            </div>

            <div className="col-md-6 col-lg-7">
              <form>
                <label className="form-label" style={{ marginTop: '10px', marginLeft: '5px' }}>
                  Seleccione Sensor:&nbsp;
                </label>
                <select className="form-select"
                  style={{ marginTop: '10px', marginLeft: '5px' }}
                  defaultValue="12"
                  onChange={handleSelectChange}>
                  <optgroup label="Sensores">
                    <option value="12">Temperatura</option>
                    <option value="13">Humedad</option>
                    <option value="14">Velocidad viento</option>
                    <option value="15">Luminosidad</option>
                    <option value="16">Calidad de aire</option>
                    <option value="17">Presión barométrica</option>
                  </optgroup>
                </select>
                <button
                  className="btn btn-primary"
                  type="button"
                  style={{
                    marginTop: '10px',
                    marginBottom: '5px',
                    marginRight: '5px',
                    marginLeft: '5px',
                    background: 'rgb(26,205,11)',
                    width: '94px',
                  }}
                  onClick={() => handleButtonClick('http://127.0.0.1:8000/api/on')}
                >
                  Encender
                </button>
                <button
                  className="btn btn-primary"
                  type="button"
                  style={{
                    marginTop: '10px',
                    marginRight: '5px',
                    marginBottom: '5px',
                    marginLeft: '5px',
                    width: '94px',
                    background: 'rgb(188,24,24)',
                  }}
                  onClick={() => handleButtonClick('http://127.0.0.1:8000/api/off')}
                >
                  Apagar
                </button>
                <button
                  className="btn btn-primary"
                  type="button"
                  style={{
                    marginTop: '10px',
                    marginBottom: '5px',
                    marginRight: '5px',
                    marginLeft: '5px',
                    background: 'rgb(22,118,187)',
                    width: '94px',
                  }}
                  onClick={() => fetchDataClick('http://127.0.0.1:8000/api/data')}
                >
                  Calcular
                </button>
                <button
                  className="btn btn-primary"
                  type="button"
                  style={{
                    marginTop: '10px',
                    marginRight: '5px',
                    marginBottom: '5px',
                    marginLeft: '5px',
                    width: '94px',
                  }}
                  onClick={() => fetchDataGraf('http://127.0.0.1:8000/api/stats')}
                >
                  Graficar
                </button>
              </form>
            </div>
            <div className="col-md-6 col-lg-12 offset-lg-0">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Promedio</th>
                      <th>Mediana</th>
                      <th>Desviación<br />Estandar</th>
                      <th>Máximo</th>
                      <th>Mínimo</th>
                      <th>Moda</th>
                      <th>Conteo</th>
                      <th>Aire Sano</th>
                      <th>Aire Contaminado</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{calData.Promedio}</td>
                      <td>{calData.Mediana}</td>
                      <td>{calData.DesEstandar}</td>
                      <td>{calData.Max}</td>
                      <td>{calData.Min}</td>
                      <td>{calData.Moda}</td>
                      <td>{calData.Conteo}</td>
                      <td>{calData.Conteo1}</td>
                      <td>{calData.Conteo0}</td>
                    </tr>
                    <tr></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8 offset-lg-0">
              <div className="card" style={{ marginTop: '10px', marginLeft: '0px', marginBottom: '10px' }}>
                <div className="card-body" style={{ marginTop: '10px', marginBottom: '11px' }}>
                  <div style={{ marginTop: '10px', marginLeft: '0px', marginBottom: '10px' }}>
                    <Bar data={chartData} options={chartOptions} />
                  </div>
                </div>
              </div>
            </div>
            <div className="col"></div>
          </div>
        </div>
      </section>

      <section id="contact">
        <div className="container">
          <h2 className="text-uppercase text-center text-secondary mb-0">Members</h2>
          <hr className="star-dark mb-5"></hr>
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <form id="contactForm" name="sentMessage">
                <div></div>
                <div>
                  <div className="mb-0 form-floating pb-2"><small className="form-text text-danger help-block"></small></div>
                </div>
                <div>
                  <div className="mb-0 form-floating pb-2">
                    <p>201905884 - Santiago Julián Barrera Reyes<br></br>
                      201019694 - Henderson Migdo Baten Hernandez<br></br>
                      201801300 - Selim Idair Ergon Castillo<br></br>
                      210801521 - Jemima Solmaira Chavajay Quiejú<br></br>
                      202100229 - Giovanni Saul Concoha Cax<br></br>
                      202201405 - Johan Moises Cardona Rosales<br></br>
                      202204578 - Estiben Yair Lopez Leveron</p>
                  </div>
                </div>
                <div></div>
                <div id="success"></div>
                <div></div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <div className="text-center text-white copyright py-4">
        <div className="container"><small>Copyright © SMARTH HOME 2024</small></div>
      </div>

    </>
  )
}

export default App
