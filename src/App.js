import './App.css';
import {
    Grid,
    Card,
    CardContent,
    CardMedia,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    InputAdornment,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import React, { useState, useEffect } from 'react';
import moment from 'moment';

function BasicSelect({ label, options, defaultValue, onChange }) {
    const [value, setValue] = useState(defaultValue);

    const handleChange = (e) => {
        setValue(e.target.value);
        onChange(e.target.value);
    }

    return (
        <>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{label}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value}
                    label={label}
                    onChange={handleChange}

                >
                    {options.map(item => <MenuItem value={item.value}>{item.label}</MenuItem>)}
                </Select>
            </FormControl>
        </>
    )
}

function BasicCard({ imageUrl, title, description }) {
    return (
        <Card className='Card'>
            <CardMedia
                className='Card-Media'
                component="img"
                height="140"
                image={imageUrl}
                alt={title}
            />
            <CardContent className='Card-Content'>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="Card-Description"  >
                    {description}
                </Typography>
            </CardContent>
        </Card>
    );
}

function useFetch(url) {
    const [data, setData] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        fetch(url, { headers: { Authorization: 'qazwsx' } })
            .then(res => res.json())
            .then(res => setData(res))
            .catch(err => setError(err))
    }, [url]);

    return { data, error };
}

function App() {
    const MODO_VISUALIZACION = {
        GRILLA: 0,
        LISTA: 1
    };

    const TAMANIO_GRILLA = {
        GRILLA: 6,
        LISTA: 12
    }

    const ORDENAR_POR = {
        NOMBRE: 'Nombre',
        FECHA: 'Fecha'
    }

    const API_BASE_URL = 'http://localhost:3001/';
    const ZODIAC_SIGNS_URL = 'zodiac_signs';

    const [gridSize, setGridSize] = useState(TAMANIO_GRILLA.GRILLA);
    const [signs, setSigns] = useState([]);
    const [buscador, setBuscador] = useState('')
    const { data } = useFetch(`${API_BASE_URL}${ZODIAC_SIGNS_URL}`);

    useEffect(() => {
        todaysHoroscopeInFirstPosition(data);
        setSigns(addFlagsToFilter(data));
    }, [data, signs]);

    const handleChangeVisualizacion = (modo) => {
        switch (modo) {
            case MODO_VISUALIZACION.GRILLA:
                setGridSize(TAMANIO_GRILLA.GRILLA);
                break;
            case MODO_VISUALIZACION.LISTA:
                setGridSize(TAMANIO_GRILLA.LISTA);
                break;

            default:
                break;
        }
    }

    const handleChangeOrdenarPor = (ordenarPor) => {

        switch (ordenarPor) {
            case ORDENAR_POR.NOMBRE:
                setSigns(todaysHoroscopeInFirstPosition(orderHoroscopeByName(data)));
                break;
            case ORDENAR_POR.FECHA:
                setSigns(todaysHoroscopeInFirstPosition(orderHoroscopeByDate(data)));
                break;

            default:
                break;
        }
    }

    const handleChangeSearch = (buscador) => {
            setBuscador(buscador)
         


    }



    const orderHoroscopeByName = (loadedData) => {
        Array.isArray(loadedData) && loadedData.sort((x, y) =>
            x.name.localeCompare(y.name, 'es', { sensitivity: 'base' })
        )

        return loadedData;

    }

    const orderHoroscopeByDate = (loadedData) => {
        Array.isArray(loadedData) && loadedData.sort((x, y) => {
            const formatDate = "DD-MM";
            let initDateX = moment(x.init_date, formatDate);
            let initDateY = moment(y.init_date, formatDate);

            return initDateX.isAfter(initDateY) ? 1 : -1;
        })

        return loadedData;

    }

    const addFlagsToFilter = (loadedData) => {
        return Array.isArray(loadedData) && loadedData.map((sign) => ({ ...sign, render: true }))
    }

    const todaysHoroscopeInFirstPosition = (loadedData) => {
        Array.isArray(loadedData) && loadedData.sort((x, y) => {
            const formatDate = "DD-MM";
            let position = 0;
            let today = moment();
            let signX = {
                initDate: moment(x.init_date, formatDate),
                endDate: moment(x.end_date, formatDate)
            };
            let signY = {
                initDate: moment(y.init_date, formatDate),
                endDate: moment(y.end_date, formatDate)
            };

            if (today.isBetween(signX.initDate, signX.endDate) || today.isSame(signX.initDate) || today.isSame(signX.endDate)) {
                position = -1;
            }
            if (today.isBetween(signY.initDate, signY.endDate) || today.isSame(signY.initDate) || today.isSame(signY.endDate)) {
                position = 1;
            }

            return position;
        })

        return loadedData;

    }

    return (
        <div className="App">
            <div className="App-Header">
                Horóscopo
            </div>
            <div className="App-Body">
                <div className="App-Horoscope">
                    <Grid container spacing={4}>

                        <Grid item xs={2}>
                            <BasicSelect
                                label='Ver Como'
                                options={[
                                    { label: 'Grilla', value: MODO_VISUALIZACION.GRILLA },
                                    { label: 'Lista', value: MODO_VISUALIZACION.LISTA }
                                ]}
                                defaultValue={MODO_VISUALIZACION.GRILLA}
                                onChange={handleChangeVisualizacion}
                            />


                        </Grid>
                        <Grid item xs={2}>
                            <BasicSelect
                                label='Ordenar Por'
                                options={[
                                    { label: ORDENAR_POR.NOMBRE, value: ORDENAR_POR.NOMBRE },
                                    { label: ORDENAR_POR.FECHA, value: ORDENAR_POR.FECHA }
                                ]}
                                defaultValue={ORDENAR_POR.NOMBRE}
                                onChange={handleChangeOrdenarPor}
                            />
                        </Grid>
                        <Grid item xs={6}></Grid>
                        <Grid item xs={2}>
                            <TextField
                                id="BS"
                                label="Buscar por signo"
                                variant="outlined"
                                onChange={(e) => handleChangeSearch(e.target.value)}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"><Search /></InputAdornment>,
                                }}
                            />

                        </Grid>
                        {
                            Array.isArray(signs) && signs.filter(sign => sign.name.toLowerCase().includes(buscador)).map((sign, index) => {
                                return sign.render && <Grid item xs={(index === 0 && buscador === '') ? 12 : gridSize}>
                                    <BasicCard
                                        title={sign.name}
                                        description={sign.prediction}
                                        imageUrl={`${API_BASE_URL}${sign.image}`}
                                    />
                                </Grid>
                            })
                        }
                    </Grid>
                </div>
            </div>
        </div>
    );
}

export default App;
