var betaval = 0.5, time = 500, dt = 1, t0 = 50.0, cons = 1.0, periodo = 180.0,
    theta0 = 0.011, theta1 = 0.0, theta2 = 0.0, phi1 = 0.03, phi2 = 0.03,
    lambda = 4.87e-5, mu = 1.64e-5, eta = 0.071, zeta = 0.005,
    p1 = 0.0, p2 = 0.0;

var initvalues = {"S0": 1 - 1.e-10, "V10": 0.0, "V20": 0.0, "I0": 1.e-10,
                  "R0": 0.0, "D10": 0.0, "D20": 0.0};

function beta(t, betaval = 0.9, t0 = 50.0, cons = 0.7, periodo = 180.0){
    return betaval*(1 + cons*Math.cos(Math.PI*(t + t0)/periodo));
}

function dF(S, V1, V2, I, R, D1, D2, t = 0.0, theta0 = 0.011, theta1 = 0.0, theta2 = 0.0, phi1 = 0.0, phi2 = 0.0, lambda = 4.87e-5, mu = 1.64e-5, eta = 0.071, zeta = 0.005, p1 = 0.0, p2 = 0.0, betaval = 0.9, t0 = 50.0, cons = 0.7, periodo = 180.0, contagiosidad = 0.0){
    return {
        "s":  -lambda*(S + V1 + V2 + I + R) + theta0*R + theta1*V1 + theta2*V2 - (p1*phi1 + mu + beta(t, betaval = betaval, t0 = t0, cons = cons, periodo = periodo)*(I + (1 - contagiosidad)*V1 + (1 - contagiosidad)*V2))*S,
        "v1": p1*phi1*S - (p2*phi2*V1 + theta1 + mu)*V1,
        "v2": p2*phi2*V1 - (theta2 + mu)*V2,
        "i":  beta(t, betaval = betaval, t0 = t0, cons = cons, periodo = periodo)*(I + (1 - contagiosidad)*V1 + (1 - contagiosidad)*V2)*S - (eta + zeta + mu)*I,
        "r":  eta*I - (theta0 + mu)*R,
        "d1": zeta*I,
        "d2": mu*(S + V1 + V2 + I + R)
    };
}


function SIR(S0 = 1 - 1.e-10, V10 = 0.0, V20 = 0.0, I0 = 1.e-10, R0 = 0.0, D10 = 0.0, D20 = 0.0, time = 500, dt = 0.01, theta0 = 0.011, theta1 = 0.0, theta2 = 0.0, phi1 = 0.0, phi2 = 0.0, lambda = 4.87e-5, mu = 1.64e-5, eta = 0.071, zeta = 0.005, p1 = 0.0, p2 = 0.0, betaval = 0.9, t0 = 50.0, cons = 0.7, periodo = 180.0, contagiosidad = 0.0){

    var k1,k2,k3,k4,
        data = [{"s": S0, "v1": V10, "v2": V20, "i": I0, "r": R0, "d1": D10, "d2": D20, "t": 0}];
    do {

        k1 = dF(data[data.length - 1]["s"],
                data[data.length - 1]["v1"],
                data[data.length - 1]["v2"],
                data[data.length - 1]["i"],
                data[data.length - 1]["r"],
                data[data.length - 1]["d1"],
                data[data.length - 1]["d2"],
                data[data.length - 1]["t"],
                theta0, theta1, theta2, phi1, phi2,
                lambda, mu, eta, zeta, p1, p2, betaval, t0,
                cons, periodo, contagiosidad);

        k2 = dF(data[data.length - 1]["s"]  + 0.5*k1["s"]*dt,
                data[data.length - 1]["v1"] + 0.5*k1["v1"]*dt,
                data[data.length - 1]["v2"] + 0.5*k1["v2"]*dt,
                data[data.length - 1]["i"]  + 0.5*k1["i"]*dt,
                data[data.length - 1]["r"]  + 0.5*k1["r"]*dt,
                data[data.length - 1]["d1"] + 0.5*k1["d1"]*dt,
                data[data.length - 1]["d2"] + 0.5*k1["d2"]*dt,
                data[data.length - 1]["t"],
                theta0, theta1, theta2, phi1, phi2,
                lambda, mu, eta, zeta, p1, p2, betaval, t0,
                cons, periodo, contagiosidad);

        k3 = dF(data[data.length - 1]["s"]  + 0.5*k2["s"]*dt,
                data[data.length - 1]["v1"] + 0.5*k2["v1"]*dt,
                data[data.length - 1]["v2"] + 0.5*k2["v2"]*dt,
                data[data.length - 1]["i"]  + 0.5*k2["i"]*dt,
                data[data.length - 1]["r"]  + 0.5*k2["r"]*dt,
                data[data.length - 1]["d1"] + 0.5*k2["d1"]*dt,
                data[data.length - 1]["d2"] + 0.5*k2["d2"]*dt,
                data[data.length - 1]["t"],
                theta0, theta1, theta2, phi1, phi2,
                lambda, mu, eta, zeta, p1, p2, betaval, t0,
                cons, periodo, contagiosidad);


        k4 = dF(data[data.length - 1]["s"]  + 0.5*k3["s"]*dt,
                data[data.length - 1]["v1"] + 0.5*k3["v1"]*dt,
                data[data.length - 1]["v2"] + 0.5*k3["v2"]*dt,
                data[data.length - 1]["i"]  + 0.5*k3["i"]*dt,
                data[data.length - 1]["r"]  + 0.5*k3["r"]*dt,
                data[data.length - 1]["d1"] + 0.5*k3["d1"]*dt,
                data[data.length - 1]["d2"] + 0.5*k3["d2"]*dt,
                data[data.length - 1]["t"],
                theta0, theta1, theta2, phi1, phi2,
                lambda, mu, eta, zeta, p1, p2, betaval, t0,
                cons, periodo, contagiosidad);


        data.push({
            "s": data[data.length - 1]["s"] + dt*(k1["s"] + 2*k2["s"] + 2*k3["s"] + k4["s"])/6.0,
            "v1": data[data.length - 1]["v1"] + dt*(k1["v1"] + 2*k2["v1"] + 2*k3["v1"] + k4["v1"])/6.0,
            "v2": data[data.length - 1]["v2"] + dt*(k1["v2"] + 2*k2["v2"] + 2*k3["v2"] + k4["v2"])/6.0,
            "i": data[data.length - 1]["i"] + dt*(k1["i"] + 2*k2["i"] + 2*k3["i"] + k4["i"])/6.0,
            "r": data[data.length - 1]["r"] + dt*(k1["r"] + 2*k2["r"] + 2*k3["r"] + k4["r"])/6.0,
            "d1": data[data.length - 1]["d1"] + dt*(k1["d1"] + 2*k2["d1"] + 2*k3["d1"] + k4["d1"])/6.0,
            "d2": data[data.length - 1]["d2"] + dt*(k1["d2"] + 2*k2["d2"] + 2*k3["d2"] + k4["d2"])/6.0,
            "t": data[data.length - 1]["t"] + dt
        })

    } while (data[data.length - 1]["t"] < time);

    return data;

}
