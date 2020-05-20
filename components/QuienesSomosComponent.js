import React, {Component} from "react";
import {Card, ListItem} from "react-native-elements";
import {FlatList, ScrollView, Text, View} from "react-native";
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';


import {HISTORIA} from "../common/historia";
import {baseUrl} from "../common/common";
import {IndicadorActividad} from "./IndicadorActividadComponent";

const mapStateToProps = state => {
    return {
        actividades: state.actividades
    }
}

function Historia(props) {

    const historia = props.historia;

    if (historia) {
        return(
            <Animatable.View animation="zoomIn" duration={1000} delay={500}>
                <Card
                    title={historia.titulo}
                >
                    <Text style={{margin: 10}}>
                        {historia.descripcion}
                    </Text>
                </Card>
            </Animatable.View>

        )
    } else {
        return (<View></View>)
    }
}

const renderActividadesItem = ({item, index}) => {

    return(
        <Animatable.View animation="swing" duration={1000} delay={1500}>
            <ListItem
                key={index}
                title={item.nombre}
                subtitle={item.descripcion}
                hideChevron={true}
                leftAvatar={{source: {uri: item.imagen}}}
            />
        </Animatable.View>
    )
}


class QuienesSomos extends Component{
    constructor(props) {
        super(props);
        this.state = {
            historia: HISTORIA,
        }
    }
    render() {
        return(
            <ScrollView>
                <Historia historia={this.state.historia}/>
                <View>
                    <Card
                        title='Actividades y recursos'
                    >
                        {this.props.actividades.isLoading &&
                            <IndicadorActividad />
                        }
                        {!this.props.actividades.isLoading &&
                            <FlatList
                                data={this.props.actividades.actividades}
                                renderItem={renderActividadesItem}
                                keyExtractor={item => item.id.toString()}
                            />
                        }
                    </Card>
                </View>
            </ScrollView>
        )
    }
}
export default connect(mapStateToProps)(QuienesSomos);
