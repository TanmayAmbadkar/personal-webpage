import numpy as np
from scipy.optimize import curve_fit
import matplotlib.pyplot as plt

from sklearn.metrics import mean_squared_error, r2_score

P_data = np.array([40, 35, 30, 25, 20])
y_data = np.array([0.000805, 0.000713, 0.000845, 0.001042, 0.00129])

def model(P, a, b, c, P0):
    numerator = a * np.exp(-b*P)
    denominator = 1 - np.exp(-c * (P - P0))
    return numerator / denominator

p0 = [0.000018, -0.027216, 0.002416, 10.202560]  # Initial guess for parameters a, b, c, P0

params, covariance = curve_fit(model, P_data, y_data, p0=p0, maxfev=10000)
a, b, c, P0 = params

# Model predictions for plotting
P_fit = np.linspace(min(P_data), max(P_data), 100)

y_fit = model(P_fit, a, b, c, P0)

print("a:", a)
print("b:", b)
print("c:", c)
print("P0:", P0)

print("Mean Squared Error:", mean_squared_error(y_data, model(P_data, a, b, c, P0)))
print("R-squared:", r2_score(y_data, model(P_data, a, b, c, P0)))

# Plotting the data and the fitted curve
plt.figure(figsize=(10, 6)) 
plt.scatter(P_data, y_data, color='red', label='Data Points')
plt.scatter(P_data, y_data, color='red', label='Data Points')
plt.plot(P_fit, y_fit, color='blue', label='Fitted Curve')
plt.title('Curve Fitting with Custom Model')
plt.xlabel('Pressure (P)')
plt.ylabel('y')
plt.legend()
plt.grid()
plt.show()

