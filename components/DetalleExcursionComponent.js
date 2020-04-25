import React, {Component} from "react";
import {FlatList, ScrollView, Text, View} from "react-native";
import {Card, Icon} from "react-native-elements";
import {EXCURSIONES} from "../common/excursiones";
import {COMENTARIOS} from "../common/comentarios";
import {baseUrl} from "../common/common";

function RenderExcursion(props) {

    const excursion = props.excursion;

    if (excursion) {
        return(
            <Card
                featuredTitle={excursion.nombre}
                image={{uri: baseUrl + excursion.imagen}}
            >
                <Text style={{margin: 10}}>
                    {excursion.descripcion}
                </Text>
                <Icon
                    raised
                    reverse
                    name={props.favorita ? 'heart' : 'heart-o'}
                    type='font-awesome'
                    color='#f50'
                    onPress={() => props.favorita ? console.log('La excursion ya esta en favoritos') : props.onPress()}
                />
            </Card>
        )
    } else {
        return (<View></View>)
    }
}

function RenderComentario(props) {

    const comentarios = props.comentarios;

    const renderComentarioItem = ({item, index}) => {

        return(
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comentario}</Text>
                <Text style={{fontSize: 12}}>{item.valoracion} Stars</Text>

                <Text style={{fontSize: 12}}>{'--' + item.autor + ', ' + item.dia}</Text>
            </View>
        )
    }

    return(
        <Card
            title='Comentarios'>
            <FlatList data={comentarios} renderItem={renderComentarioItem} keyExtractor={item => item.id.toString()} />
        </Card>
    )
}

class DetalleExcursion extends Component {

    constructor(props) {
        super(props);
        this.state = {
            excursiones: EXCURSIONES,
            comentarios: COMENTARIOS,
            favoritos: []
        }
    }

    marcarFavorito(excursionId) {
        this.setState({
            favoritos: this.state.favoritos.concat(excursionId)
        })
    }

    render() {
        console.log(this.state.favoritos)

        const {excursionId} = this.props.route.params;
        return(
            <ScrollView>
                <RenderExcursion
                    excursion={this.state.excursiones[+excursionId]}
                    favorita={this.state.favoritos.some(el => el === excursionId)}
                    onPress={() => this.marcarFavorito(excursionId)}
                />
                <RenderComentario comentarios={this.state.comentarios.filter((comentario) => comentario.excursionId === excursionId)}/>
            </ScrollView>
            )

    }

}

export default DetalleExcursion;
