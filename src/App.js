import './App.css';
import { Grid, Card, CardActionArea, CardContent, CardMedia, Typography, Box } from '@mui/material';

function App() {
    return (
        <div className="App">
            <div className="App-Header">
                Hisotropo
            </div>
            <div className="App-Body">
                <div className="App-Filters">

                </div>
                <div className="App-Horoscope">
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <div>signo del mes</div>
                        </Grid>
                        <Grid item xs={12}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    sx={{ width: 151 }}
                                    image="https://random.imagecdn.app/v1/image"
                                    alt="Live from space album cover"
                                />
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <CardContent sx={{ flex: '1 0 auto' }}>
                                        <Typography component="div" variant="h6">
                                            Live From Space
                                        </Typography>
                                        <Typography variant="subtitle1" color="text.secondary" component="div">
                                            Mac Miller
                                        </Typography>
                                    </CardContent>
                                    <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                                        
                                    </Box>
                                </Box>
                                
                            </Card>
                           
                        </Grid>
                        <Grid item xs={6}>
                            <div>signo</div>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </div>
    );
}

export default App;
