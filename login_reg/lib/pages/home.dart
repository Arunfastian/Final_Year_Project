import 'package:flutter/Material.dart';
import 'package:flutter/material.dart';
import 'package:login_reg/pages/login.dart';
class home extends StatelessWidget {
  const home({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Next Trend predictor"),
      ),
       body: Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          RaisedButton(
            splashColor: Colors.blue,
            color: Colors.blue,
            child: Text(
              "Logout",
              style: new TextStyle(fontSize: 25.0, color: Colors.white),
            ),
            onPressed: () {
              Navigator.push(
                    context, 
                    MaterialPageRoute(builder: (context) => login()),
                );
            },
          )
        ],
      ),
    ),
  );
  }
}  