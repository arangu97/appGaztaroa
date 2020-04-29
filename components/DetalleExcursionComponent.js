import React, {Component} from "react";
import {FlatList, ScrollView, Text, View} from "react-native";
import {Card, Icon} from "react-native-elements";
import {baseUrl} from "../common/common";
import { connect } from 'react-redux'
import { postFavorito } from "../redux/ActionCreators";


const mapStateToProps = state => {
    return {
        excursiones: state.excursiones,
        comentarios: state.comentarios,
        favoritos: state.favoritos
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorito: (excursionId) => dispatch(postFavorito(excursionId))
})


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

    marcarFavorito(excursionId) {
       this.props.postFavorito(excursionId)
    }

    render() {

        const {excursionId} = this.props.route.params;
        return(
            <ScrollView>
                <RenderExcursion
                    excursion={this.props.excursiones.excursiones[+excursionId]}
                    favorita={this.props.favoritos.some(el => el === excursionId)}
                    onPress={() => this.marcarFavorito(excursionId)}
                />
                <RenderComentario comentarios={this.props.comentarios.comentarios.filter((comentario) => comentario.excursionId === excursionId)}/>
            </ScrollView>
            )

    }

}

export default connect(mapStateToProps, mapDispatchToProps)(DetalleExcursion);
