import React, { useEffect, useState } from 'react'
import { type NavigationProp, useNavigation } from '@react-navigation/native';
import { Image, StyleSheet, Text, View } from 'react-native';

import axios from 'axios';
import { globalColors, globalStyles } from '../../theme/theme';
import { FlatList } from 'react-native-gesture-handler';
import { PrimaryButton } from '../../components/shared/PrimaryButton';
import { type RootStackParams } from '../../routes/StackNavigator';
import { BackButton } from '../../components/shared/BackButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CustomHeader from '../../components/CustomHeader';
import { useAuthStore } from '../../store/auth/useAuthStore';
import Credencial from '../../components/shared/Credencial';
import { TertiaryButton } from '../../components/shared/TertiaryButton';



/* const products = [
  {id:1, name: 'Product'},
  {id:2, name: 'producto 2'},
  {id:3, name: 'producto 3'},
  {id:4, name: 'producto 4'},
  {id:5, name: 'producto 5'},
]; */

export const Afiliados = () => {

  const { idAfiliado } = useAuthStore();

  const { top } = useSafeAreaInsets();

  const [products, setProducts] = useState<{ apellidoYNombre: string; nroAfiliado: string; idAfiliado: any }[]>([]);
  useEffect(() => {

    const ProductsRequest = async () => {
      try {
        const response = await axios.get(`https://andessalud.createch.com.ar/api/obtenerFamiliares?idAfiliado=${idAfiliado}`);
        /*   console.log('EL RESPONSE DE AFILIADOS ES : ---------x-x-x-x-x-x->', response); */

        const mappedProducts = response.data.data.map((item: { apellidoYNombre: any; nroAfiliado: any; idAfiliado: any }) => ({
          apellidoYNombre: item.apellidoYNombre,
          nroAfiliado: item.nroAfiliado,
          idAfiliado: item.idAfiliado
        }));

        setProducts(mappedProducts);
        console.log('este es el mappedProducts:---x-x-x-x-<<>>>', mappedProducts);



      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };
    ProductsRequest()

  }, [])

  const color = globalColors.gray
  const navigation = useNavigation<NavigationProp<RootStackParams>>()
  console.log('este es el products:', products);
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 20,
        marginTop: 20,
        /* backgroundColor: 'green', */
        marginBottom: 0,

      }}
    >
      <CustomHeader color={globalColors.gray3} />

      <BackButton />
      <Text style={{ marginBottom: 5, fontSize: 25, textAlign: 'center', }}>Afiliados a Cargo</Text>

      <View
        style={{
          marginBottom: 10, marginTop: 0, /* backgroundColor: 'yellow', */
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 20,
            marginBottom: 10,
            marginTop: 10,
            padding: 0,
            marginHorizontal: 10,
          }}
        >Selecciona un familiar para ver su credencial</Text>


        <FlatList
          style={{  /* backgroundColor: 'orange', */ marginBottom: 0, padding: 15 }}
          data={products}
          renderItem={({ item }) => (
            <TertiaryButton
              onPress={() => navigation.navigate('Credenciales', { id: item.apellidoYNombre, nroAfiliado: item.nroAfiliado, idAfiliado: item.idAfiliado })}
              label={item.apellidoYNombre}
              color={color}
            />
          )}
        />



      </View>

      {/*  <View style={{ marginTop: 0, }}>
        <TertiaryButton
          onPress={() => navigation.navigate('EstudiosMedicos')}
          label="TertiaryButton Example"
          color={globalColors.profile2}
          iconName='medkit-outline'
          description='Gestioná la orden de tus estudios'
        />

      </View> */}
      <View style={styles.imageContainer}>

        <View
          style={styles.innerContainer}
        >
          <Text style={{
            fontSize: 25,
            textAlign: 'center',
          }} >
            Andes Salud
          </Text>

          <Image source={require('../../assets/images/logogris.png')}
            style={styles.image}
            resizeMode="contain" // Ajusta la imagen manteniendo su relación de aspecto
          />
        </View>
      </View>
     {/*  <View
        style={{
          marginBottom: 100, marginTop: 50, justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 20,
            marginBottom: 10
          }}
        > Texto / imagen </Text>
      </View> */}
      {/*  <View
        style={{
          marginBottom: 350, marginTop: 0, backgroundColor: 'yellow', flex: 1, justifyContent: 'top',
          alignItems: 'center',
        }}
      >

        <Credencial />

      </View> */}
    </View>
  )
}

const styles = StyleSheet.create({
  imageContainer: {
    marginBottom: 30,
    marginHorizontal:35,
    marginTop: 40,
    zIndex: 1.5,
    alignItems: 'center',
     justifyContent: 'center', 
    minHeight:'40%',
    minWidth: '50%'
  },
  innerContainer: {
    marginBottom: 15,
    marginTop: 15,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    margin: 10,
  }
});