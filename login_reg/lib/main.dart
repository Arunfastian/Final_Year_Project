import 'package:flutter/Material.dart';
import 'pages/home.dart';
import 'pages/login.dart';
import 'pages/sign.dart';
void main(){
  runApp(const MyApp());
}
class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      routes:{
     "/": (context) => login(),
     "/sign":(context) =>  sign(),
     "/home":(context) =>  home()
      }
    );
  }
}