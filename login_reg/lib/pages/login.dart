import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';
import 'package:login_reg/pages/home.dart';
import 'sign.dart';
class login extends StatelessWidget {
  var email;
  var pass;
  Widget build(BuildContext context) {
    color: Colors.white;
    return Scaffold(
      appBar: AppBar(
        title: Text("NTP"),
      ),
      body: Form(
      child: SingleChildScrollView(
    child: Column(
      
      children: [
        Image.asset("assets/images/login_image.png",
        fit: BoxFit.cover,),
       Padding(
         padding: const EdgeInsets.all(20.0),
         child: Column(
           children: [
              TextFormField(
                  autofocus: false,
                  decoration: InputDecoration(
                    labelText: 'Email: ',
                    labelStyle: TextStyle(fontSize: 20.0),
                    border: OutlineInputBorder(),
                    errorStyle:
                        TextStyle(color: Colors.redAccent, fontSize: 15),
                  ),

                //  controller: emailController,
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Please Enter Email';
                    } else if (!value.contains('@')) {
                      return 'Please Enter Valid Email';
                    }
                    return null;
                  },
                  onChanged: (value){
                    email =value;
                  },
                ),
                SizedBox(
          height: 20.0,
        ),

           TextFormField(
                  autofocus: false,
                  obscureText: true,
                  decoration: InputDecoration(
                    labelText: 'Password: ',
                    labelStyle: TextStyle(fontSize: 20.0),
                    border: OutlineInputBorder(),
                    errorStyle:
                        TextStyle(color: Colors.redAccent, fontSize: 15),
                  ),
               //   controller: passwordController,
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Please Enter Password';
                    }
                    return null;
                  },
                  onChanged: (value){
                    pass =value;
                  }
                ),
          SizedBox(
          height: 20.0,
        ),
                    ElevatedButton(
                      onPressed: () async {
                       var result = await (Login(email, pass));
            if (result == 200) {
                Navigator.push(
                    context, 
                    MaterialPageRoute(builder: (context) => home()),
                );
            } else {
                Navigator.push(
                    context, 
                    MaterialPageRoute(builder: (context) => login()),
                );
            }
                      },
                      child: Text(
                        'Login',
                        style: TextStyle(fontSize: 18.0)
                      )
                    ),
                     Container(
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text("Don't have an Account? "),
                    TextButton(
                      onPressed: () => {
                        Navigator.pushAndRemoveUntil(
                            context,
                            PageRouteBuilder(
                              pageBuilder: (context, a, b) => sign(),
                              transitionDuration: Duration(seconds: 0),
                            ),
                            (route) => false)
                      },
                      child: Text('Signup'),
                    ),
                ])),
           SizedBox(
          height: 20.0,
        )
           ],
         ),
       ),

      ],
    ),

      )
    ));
  }
}

Login(email,pass) async{
  print(email+pass);
  Uri url = Uri.parse("http://localhost:8000/User/Login");
  final response = await http.post(
    url,
    headers: <String, String>{
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: jsonEncode(<String, String>{
      'email':email,'password':pass
    }),
  );
  //print(response.body);
  print(response.statusCode);
  return response.statusCode;
}