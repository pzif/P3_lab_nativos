import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";


import Login from "../screens/Login";
import Cadastro from "../screens/Cadastro";
import Home from "../screens/Home";
import CrudScreen from "../screens/CrudScreen";

//CrudScreen
//Amigos

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} />           
            <Tab.Screen name="Login" component={Login} />
            <Tab.Screen name="Cadastro" component={Cadastro} />                     
            <Tab.Screen name="CrudScreen" component={CrudScreen} />
        </Tab.Navigator>
    );
}