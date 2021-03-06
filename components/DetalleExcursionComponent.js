import React, {Component, useRef} from "react";
import { FlatList, Modal, ScrollView, StyleSheet, Text, View, Alert, PanResponder, Share} from "react-native";
import {Card, Icon, Rating, Input, Button} from "react-native-elements";
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux'


import {baseUrl, colorGaztaroaOscuro} from "../common/common";
import { postFavorito, postComentario } from "../redux/ActionCreators";


const mapStateToProps = state => {
    return {
        excursiones: state.excursiones,
        comentarios: state.comentarios,
        favoritos: state.favoritos
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorito: (excursionId) => dispatch(postFavorito(excursionId)),
    postComentario: (comentario) => dispatch(postComentario(comentario))
})


function RenderExcursion(props) {

    const excursion = props.excursion;

    const cardAnimada = useRef(null);

    const reconocerDragDerechaIzquierda = ({ moveX, moveY, dx, dy }) => {
        return dx < -50;
    }

    const reconocerDragIzquierdaDerecha = ({ moveX, moveY, dx, dy }) => {
        return dx > 50;
    }

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gestureState) => {
            return true;
        },
        onPanResponderGrant: () => {
            cardAnimada.current.rubberBand(1000).then(
                endState => console.log(endState.finished ? 'terminado' : 'cancelado')
            )
        },
        onPanResponderEnd: (e, gestureState) => {
            if (reconocerDragDerechaIzquierda(gestureState)){
                Alert.alert(
                    'Añadir favorito',
                    'Confirmar que desea añadir ' + excursion.nombre + ' a favoritos:',
                    [
                        {text: 'Cancelar', onPress: () => console.log('Excursión no añadida a favoritos'), style: 'cancel'},
                        {text: 'OK', onPress: () => {props.favorita ? console.log('La excursión ya se encuentra entre las favoritas') : props.onPressFavorito()}},
                    ],
                    { cancelable: false }
                );
            }
            if (reconocerDragIzquierdaDerecha(gestureState)){
                props.onPressComentar();
            }
            return true;
        }
    })

    if (excursion) {
        return(
            <Animatable.View
                animation="fadeInDown"
                duration={2000}
                delay={500}
                ref={cardAnimada}
                {...panResponder.panHandlers}
            >
                <Card
                    featuredTitle={excursion.nombre}
                    image={{uri: excursion.imagen}}
                >
                    <Text style={{margin: 10}}>
                        {excursion.descripcion}
                    </Text>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                        <Icon
                            raised
                            reverse
                            name={props.favorita ? 'heart' : 'heart-o'}
                            type='font-awesome'
                            color='#f50'
                            onPress={() => props.favorita ? console.log('La excursion ya esta en favoritos') : props.onPressFavorito()}
                        />
                        <Icon
                            raised
                            reverse
                            name='pencil'
                            type='font-awesome'
                            color={colorGaztaroaOscuro}
                            onPress={() => props.onPressComentar()}
                        />
                        <Icon
                            raised
                            reverse
                            name='share-alt'
                            type='font-awesome'
                            color='#080'
                            onPress={async () => {
                                try {
                                    const result = await Share.share({
                                        message:
                                            'He descubierto esta excursión por la aplicación appGaztaroa: ' + excursion.nombre + '\n\n' +
                                            excursion.descripcion,
                                    });
                                } catch (error) {
                                    alert(error.message);
                                }
                            }}
                        />
                    </View>
                </Card>
            </Animatable.View>

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
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
            <Card
                title='Comentarios'>
                <FlatList data={comentarios} renderItem={renderComentarioItem} keyExtractor={item => item.id.toString()} />
            </Card>
        </Animatable.View>

    )
}

class DetalleExcursion extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rating: 3,
            autor: '',
            comentario: '',
            showModal: false
        }
    }

    marcarFavorito(excursionId) {
       this.props.postFavorito(excursionId)
    }

    gestionarComentario(excursionId){
        const dia = new Date(Date.now()).toISOString()
        const comentario = {
            id: null,
            excursionId: excursionId,
            valoracion: this.state.rating,
            autor: this.state.autor,
            comentario: this.state.comentario,
            dia: dia
        }
        this.props.postComentario(comentario)
        this.resetForm()
    }

    resetForm(){
        this.setState({
            rating: 3,
            autor: '',
            comentario: '',
            showModal: false
        });
    }

    toggleModal(){
        this.setState({
            showModal: !this.state.showModal
        })
    }

    render() {
        const {excursionId} = this.props.route.params;
        return(
            <ScrollView>
                <RenderExcursion
                    excursion={this.props.excursiones.excursiones[+excursionId]}
                    favorita={this.props.favoritos.some(el => el === excursionId)}
                    onPressFavorito={() => this.marcarFavorito(excursionId)}
                    onPressComentar={() => this.toggleModal()}
                />
                <RenderComentario comentarios={this.props.comentarios.comentarios.filter((comentario) => comentario.excursionId === excursionId)}/>
                <Modal
                    animationType = {"slide"}
                    transparent = {false}
                    visible = {this.state.showModal}
                    onDismiss = {() => {this.toggleModal(); this.resetForm();}}
                    onRequestClose = {() => {this.toggleModal(); this.resetForm();}}>
                    <View style = {styles.modal}>
                        <Rating
                            showRating
                            startingValue={3}
                            onFinishRating={rating => this.setState({rating: rating})}
                        />
                        <Input
                            placeholder='Autor'
                            leftIcon={{ type: 'font-awesome', name: 'user' }}
                            leftIconContainerStyle={{marginRight: 15}}
                            onChangeText={value => this.setState({autor: value})}
                        />
                        <Input
                            placeholder='Comentario'
                            leftIcon={{ type: 'font-awesome', name: 'comment' }}
                            leftIconContainerStyle={{marginRight: 15}}
                            onChangeText={value => this.setState({comentario: value})}
                        />
                        <Button
                            onPress = {() => this.gestionarComentario(excursionId)}
                            style={{backgroundColor: '#fff', color: colorGaztaroaOscuro}}
                            title="Enviar"
                            type='clear'
                        />
                        <Button
                            onPress = {() =>{this.toggleModal(); this.resetForm();}}
                            title="Cancelar"
                            type='clear'
                        />
                    </View>
                </Modal>
            </ScrollView>
            )

    }

}
const styles = StyleSheet.create({
    modal: {
        justifyContent: 'center',
        margin: 20
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(DetalleExcursion);
