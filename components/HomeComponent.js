import {Card} from "react-native-elements";
import {ScrollView, Text, View} from "react-native";
import React, {Component} from "react";
import {EXCURSIONES} from "../common/excursiones";
import {CABECERAS} from "../common/cabeceras";
import {ACTIVIDADES} from "../common/actividades";


function RenderItem(props) {
    const item = props.item

    if(item){
        return(
            <Card
                featuredTitle={item.nombre}
                image={require('./imagenes/40Años.png')}>
                <Text
                    style={{margin: 10}}
                >
                    {item.descripcion}
                </Text>
            </Card>
        )
    } else {
        return (<View></View>)
    }
}

class Home extends Component{

    constructor(props) {
        super(props);
        this.state = {
            excursiones: EXCURSIONES,
            cabeceras: CABECERAS,
            actividades: ACTIVIDADES
        }
    }

    render() {
        return(
            <ScrollView>
                <RenderItem item={this.state.cabeceras.filter((cabecera) => cabecera.destacado)[0]}/>
                <RenderItem item={this.state.excursiones.filter((excursion) => excursion.destacado)[0]} />
                <RenderItem item={this.state.actividades.filter((actividad) => actividad.destacado)[0]} />
            </ScrollView>
        )
    }
}

export default Home;
