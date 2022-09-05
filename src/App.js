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
        fetch(url, {headers: { Authorization: 'qazwsx' }})
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

    const API_BASE_URL = 'http://localhost:3001/';
    const ZODIAC_SIGNS_URL = 'zodiac_signs';

    const [gridSize, setGridSize] = useState(TAMANIO_GRILLA.GRILLA);
    const [signs, setSigns] = useState([]);
    const {data} = useFetch(`${API_BASE_URL}${ZODIAC_SIGNS_URL}`);
    
    useEffect(() => {
        onLoadData(data);
    }, [data]);

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

    const onLoadData = (loadedData) => {
        Array.isArray(loadedData) && loadedData.forEach((sign) => {
            if (sign.name === 'virgo') {
                loadedData.unshift(sign);
            }
        })
        setSigns(loadedData);
    }

    return (
        <div className="App">
            <div className="App-Header">
                Horóscopo
            </div>
            <div className="App-Body">
                <div className="App-Horoscope">
                    <Grid container spacing={2}>
                        <Grid item xs={2}>
                            <BasicSelect 
                                label='Ver Como'
                                options={[
                                    {label: 'Grilla', value: MODO_VISUALIZACION.GRILLA},
                                    {label: 'Lista', value: MODO_VISUALIZACION.LISTA}
                                ]}
                                defaultValue={MODO_VISUALIZACION.GRILLA}
                                onChange={handleChangeVisualizacion}
                            />
                             <BasicSelect 
                                label='Ver C'
                                options={[
                                    {label: 'Alfabetico'},
                                    {label: 'Fecha'}
                                ]}
                                defaultValue={MODO_VISUALIZACION.GRILLA}
                                onChange={handleChangeVisualizacion}
                            />
                        </Grid>
                        <Grid item xs={8}></Grid>
                        <Grid item xs={2}>
                            <TextField 
                                id="BS" 
                                label="Buscar por signo" 
                                variant="outlined"
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"><Search /></InputAdornment>,
                              }} 
                            />
                        </Grid>
                        {
                            Array.isArray(signs) && signs.map((sign) => (
                                <Grid item xs={gridSize}>
                                    <BasicCard 
                                        title={sign.name}
                                        description={sign.prediction}
                                        imageUrl={`${API_BASE_URL}${sign.image}`}
                                    />
                                </Grid>
                            ))
                        }
                    </Grid>
                </div>
            </div>
        </div>
    );
}

export default App;
