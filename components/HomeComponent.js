import {Card} from "react-native-elements";
import {ScrollView, Text, View} from "react-native";
import React, {Component} from "react";
import {baseUrl} from "../common/common";
import { connect } from 'react-redux';


const mapStateToProps = state => {
    return {
        excursiones: state.excursiones,
        cabeceras: state.cabeceras,
        actividades: state.actividades
    }
}

function RenderItem(props) {
    const item = props.item

    if(item){
        return(
            <Card
                featuredTitle={item.nombre}
                image={{uri: baseUrl + item.imagen}}>
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

    render() {
        return(
            <ScrollView>
                <RenderItem item={this.props.cabeceras.cabeceras.filter((cabecera) => cabecera.destacado)[0]}/>
                <RenderItem item={this.props.excursiones.excursiones.filter((excursion) => excursion.destacado)[0]} />
                <RenderItem item={this.props.actividades.actividades.filter((actividad) => actividad.destacado)[0]} />
            </ScrollView>
        )
    }
}

export default connect(mapStateToProps)(Home);
