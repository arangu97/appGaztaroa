import React, { Component } from "react";
import { connect } from 'react-redux'
import {View, FlatList, Modal, Text, Image, TouchableHighlight, ScrollView} from "react-native";
import {Button, Card, Icon, Input, Overlay} from "react-native-elements";
import * as ImagePicker from 'expo-image-picker';

import {colorGaztaroaOscuro} from "../common/common";
import {postPaisaje} from "../redux/ActionCreators";
import * as Constants from "expo-constants";


const mapStateToProps = state => {
    return {
        paisajes: state.paisajes
    }
}

const mapDispatchToProps = dispatch => ({
    postPaisaje: (paisaje) => dispatch(postPaisaje(paisaje))
})

class MisPaisajes extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nombre: '',
            descripcion: '',
            imagen: '',
            showModal: false,
            modalError : '',
            imageVisible: false,
            imageToShow: ''
        }
    }



    resetForm(){
        this.setState({
            nombre: '',
            descripcion: '',
            showModal: false,
            modalError: '',
        });
    }

    toggleModal(){
        this.setState({
            showModal: !this.state.showModal
        })
    }

    gestionarPaisaje(){
        if(this.state.nombre !== '' || this.state.descripcion !== '' || this.state.imagen !== '') {
            let newId;
            if(!this.props.paisajes.paisajes) {
                newId = 0
            } else {
                newId = this.props.paisajes.paisajes.length
            }
            const paisaje = {
                id : newId ,
                nombre : this.state.nombre,
                descripcion : this.state.descripcion,
                imagen: this.state.imagen
            }
            this.props.postPaisaje(paisaje)
            this.resetForm()
        } else {
            this.setState({
                modalError : 'Debes especificar un nombre, descripción y añadir una foto.'
            })
        }
    }

    getPermissionAsync = async () => {
        if (Constants.platform.Android) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Debe permitir el acceso a los recursos de su dispositivo móvil.');
            }
        }
    };

    cargarImagen() {
        this.getPermissionAsync()
        ImagePicker.launchImageLibraryAsync({
            mediaTypes: "Images"
        }).then((result) => {
            if(!result.cancelled) {
                const {uri} = result;
                this.setState({imagen: uri})
            }
        }).catch((error) => {
            throw error;
        })
    }

    handleShowImage(image) {
        this.setState({
            imageVisible : true,
            imageToShow : image
        })
    }

    handleCloseImage(){
        this.setState({
            imageVisible : false,
            imageToShow: ''
        })
    }



    render() {
        const renderPaisajeItem = ({item, index}) => {
            return(
                <View>
                    <TouchableHighlight
                        onPress={() => this.handleShowImage(item.imagen)}
                    >
                        <Card
                            key={index}
                            title={item.nombre}
                            image={{uri: item.imagen}}
                        >
                            <Text
                                style={{margin: 10, textAlign: 'center'}}
                            >
                                {item.descripcion}
                            </Text>
                        </Card>
                    </TouchableHighlight>
                </View>
            )
        }
        return (
            <ScrollView>
                <Overlay style={{ flex: 1, justifyContent: 'flex-start' }} isVisible={this.state.imageVisible} onBackdropPress={() => this.handleCloseImage()}>
                    <Image source={{uri : this.state.imageToShow}} style={{width: '100%', height: '50%'}} resizeMode='contain'/>
                </Overlay>
                <FlatList
                    data={this.props.paisajes.paisajes}
                    renderItem={renderPaisajeItem}
                    keyExtractor={item => item.id.toString()}
                />
                <View style={{alignItems: 'center'}}>
                    <Button
                        title='Añadir paisaje'
                        buttonStyle={{ margin : 15, width: '35%', paddingLeft : 15}}
                        onPress={() => this.toggleModal()}
                        icon={{
                            name: "add",
                            size: 15,
                            color: "white"
                        }}
                    />
                </View>
                <Modal
                    animationType = {"slide"}
                    transparent = {false}
                    visible = {this.state.showModal}
                    onDismiss = {() => {this.toggleModal(); this.resetForm();}}
                    onRequestClose = {() => {this.toggleModal(); this.resetForm();}}>
                    <View style={{ justifyContent : 'center', alignItems: 'center'}}>
                        <Text
                            style={{fontWeight : 'bold' , fontSize : 40}}
                        >
                            Añadir paisaje
                        </Text>
                        <Text style={{ color: 'red' }}>
                            {this.state.modalError}
                        </Text>
                        <Input
                            placeholder='Nombre del paisaje'
                            leftIcon={{ type: 'font-awesome', name: 'image' }}
                            leftIconContainerStyle={{marginRight: 15}}
                            onChangeText={value => this.setState({nombre: value})}
                        />
                        <Input
                            placeholder='Descripción'
                            leftIcon={{ type: 'font-awesome', name: 'clipboard' }}
                            leftIconContainerStyle={{marginRight: 15}}
                            onChangeText={value => this.setState({descripcion: value})}
                        />
                        { this.state.imagen === '' &&
                            <Button
                                onPress = {() => this.cargarImagen()}
                                icon={{
                                    name: "image",
                                    size: 15,
                                    color: "white"
                                }}
                                title="Cargar imagen"
                                buttonStyle={{ margin : 10 }}
                            />
                        }

                        { this.state.imagen !== '' &&
                            <View
                                style={{
                                    paddingVertical: 15,
                                    paddingHorizontal: 10,
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center"
                                }}
                            >
                                <Icon
                                    raised
                                    reverse
                                    name='check-circle'
                                    type='font-awesome'
                                    color='#21C416'
                                />
                                <Text style={{
                                    fontSize: 16,
                                    color: "black"
                                }}
                                >
                                    Imagen cargada con éxito
                                </Text>
                            </View>
                        }

                        <Button
                            onPress = {() => this.gestionarPaisaje()}
                            style={{backgroundColor: '#fff', color: colorGaztaroaOscuro}}
                            title="Guardar paisaje"
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



export default connect(mapStateToProps, mapDispatchToProps)(MisPaisajes);
