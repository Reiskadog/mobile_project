import { createAppContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/native-stack';
import Fisu from '../Fisu';
import FishInput from '../FishInput';

const MyNavigator=createStackNavigator({
    FishInput:FishInput,
    Fisu:Fisu,
},
{
    initialRouteName: 'Fisu',
}
);
//Notice this: createApp....
export default createAppContainer(MyNavigator);