import React, {useState} from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  TextInput,
  Alert,
} from 'react-native';

import DropDownPicker from 'react-native-dropdown-picker';

const imagenes: any = {
  'clear sky': require('../images/clearSky.png'),
  'few clouds': require('../images/fewClouds.png'),
  'scattered clouds': require('../images/fewClouds.png'),
  rain: require('../images/rain.png'),
  thunderstorm: require('../images/thunderStorm.png'),
  'light rain': require('../images/thunderStorm.png'),
  'shower rain': require('../images/rain.png'),
  'broken clouds': require('../images/fewClouds.png'),
};
const estados: any = {
  'clear sky': 'Despejado',
  'few clouds': 'Nubosidad',
  'scattered clouds': 'Nublado',
  rain: 'Lluvias',
  thunderstorm: 'Tormenta',
  'light rain': 'Tormenta',
  'shower rain': 'Lluvias',
  'broken clouds': 'Nublado',
};

const Carta = () => {
  const [clima, setClima] = useState({});
  const [ciudad, setCiudad] = useState('');
  const [open, setOpen] = useState(false);
  const [pais, setPais] = useState('');
  const [paices, setPaices] = useState([
    {label: 'Argentina', value: 'AR'},
    {label: 'Colombia', value: 'CO'},
    {label: 'Uruguay', value: 'UY'},
    {label: 'Paraguay', value: 'PY'},
    {label: 'Mexico', value: 'MX'},
    {label: 'Estados Unidos', value: 'US'},
  ]);

  async function getClima() {
    try {
      if ([ciudad, pais].includes('')) {
        Alert.alert(
          'Error',
          'Debe seleccionar un país y colocar una ciudad válida',
        );
        return;
      }
      const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${ciudad},${pais}&appid=0b678d79a054053517e655955021ace2`;
      const req = await fetch(url);
      const res = await req.json();

      setClima({
        temp: Math.ceil(res.main.temp),
        img: res.weather[0].description,
        estado: res.weather[0].description,
        ciud: res.name,
      });
    } catch (err) {
      Alert.alert('Error', 'Ciudad no encontrada');
    }
  }

  return (
    <View style={styles.carta}>
      <View style={styles.content}>
        {Object.keys(clima).length > 0 ? (
          <View style={styles.sup}>
            <Text style={styles.city}>{clima.ciud}</Text>
            <View style={styles.infoWeather}>
              <Text style={styles.temp}>{clima?.temp}°C</Text>
              <View>
                <Image
                  style={styles.imgWeather}
                  source={imagenes[clima?.img]}
                />
              </View>
            </View>
            <View style={styles.tempTextContent}>
              <Text style={styles.tempText}>{estados[clima?.estado]}</Text>
            </View>
          </View>
        ) : (
          <View style={styles.sup}>
            <Text style={styles.city}>Climatologo</Text>
            <Text style={styles.label}>Seleccione el País y la ciudad</Text>
          </View>
        )}
        <View style={styles.form}>
          <View style={styles.field}>
            <Text style={styles.label}>Ciudad</Text>
            <TextInput
              style={styles.input}
              placeholder="Coloque su ciudad"
              value={ciudad}
              onChangeText={(item: string) => {
                setCiudad(item);
              }}
            />
          </View>
          <View style={styles.field}>
            <DropDownPicker
              open={open}
              value={pais}
              items={paices}
              setOpen={setOpen}
              setValue={setPais}
              setItems={setPaices}
              placeholder="País"
              style={styles.select}
              listMode="MODAL"
              modalProps={{
                animationType: 'fade',
              }}
            />
          </View>
          <Pressable
            style={styles.btnSol}
            onPress={() => {
              getClima();
            }}>
            <Text style={styles.btnSolText}>Solicitar</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  carta: {
    flex: 1,
  },
  content: {
    flex: 1,
    gap: 10,
  },
  sup: {
    //backgroundColor: 'red',
    flex: 1,
    position: 'relative',
    alignItems: 'center',
    paddingTop: 15,
    marginTop: 30,
  },
  infoWeather: {
    marginTop: 10,
    flexDirection: 'row-reverse',
    gap: 10,
    alignItems: 'center',
  },
  city: {
    fontSize: 28,
    fontWeight: '900',
  },
  imgWeather: {
    width: 50,
    height: 50,
  },
  temp: {
    fontSize: 50,
  },
  tempTextContent: {
    position: 'absolute',
    top: 55,
    right: -20,
    transform: [
      {
        rotateZ: '-90deg',
      },
    ],
  },
  tempText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  form: {
    //backgroundColor: 'green',
    marginBottom: 50,
  },
  field: {
    gap: 10,
    marginTop: 20,
    height: 100,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  input: {
    backgroundColor: '#F1F1F2',
    borderRadius: 10,
    textAlign: 'center',
    elevation: 2,
  },
  select: {
    textAlign: 'center',
    backgroundColor: '#f1f1f1',
    elevation: 2,
    borderColor: 'transparent',
    borderRadius: 10,
  },
  btnSol: {
    backgroundColor: 'skyblue',
    padding: 10,
    borderRadius: 10,
    elevation: 2,
  },
  btnSolText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
  },
});

export default Carta;
