import numpy as np
import torch
import torch.nn as nn
import torch.optim as optim
import matplotlib.pyplot as plt
from sklearn.metrics import mean_squared_error, r2_score

# 1. Data Preparation
# Original data as numpy arrays
P_data_np = np.array([40, 35, 30, 25, 20], dtype=np.float32)
y_data_np = np.array([0.000805, 0.000713, 0.000845, 0.001042, 0.00129], dtype=np.float32)

# Convert numpy arrays to PyTorch tensors
P_data = torch.from_numpy(P_data_np).view(-1, 1)
y_data = torch.from_numpy(y_data_np).view(-1, 1)

# 2. Model Definition
class CustomModel(nn.Module):
    def __init__(self, p0):
        """
        Initializes the model with trainable parameters a, b, c, and P0.
        p0 is the list of initial guesses for the parameters.
        """
        super(CustomModel, self).__init__()
        # nn.Parameter makes these values trainable during optimization
        self.a = nn.Parameter(torch.tensor(p0[0], dtype=torch.float32))
        self.b = nn.Parameter(torch.tensor(p0[1], dtype=torch.float32))
        self.c = nn.Parameter(torch.tensor(p0[2], dtype=torch.float32))
        self.P0 = nn.Parameter(torch.tensor(p0[3], dtype=torch.float32))

    def forward(self, P):
        """
        Defines the forward pass of the model.
        This is the custom function you want to fit.
        """
        numerator = self.a * torch.exp(-self.b * P)
        denominator = 1 - torch.exp(-self.c * (P - self.P0))
        return numerator / denominator

# Initial guess for parameters [a, b, c, P0]
p0 = [0.000018, -0.027216, 0.002416, 10.202560]

# Instantiate the model
model = CustomModel(p0)

# 3. Training Setup
# Define the loss function (Mean Squared Error) and the optimizer (Adam)
criterion = nn.MSELoss()
optimizer = optim.Adam(model.parameters(), lr=0.0001) # A smaller learning rate is often good
epochs = 20000 # Number of training iterations

# 4. Training Loop
for epoch in range(epochs):
    # Forward pass: compute predicted y by passing P to the model
    y_pred = model(P_data)

    # Compute loss
    loss = criterion(y_pred, y_data)

    # Zero gradients, perform a backward pass, and update the weights
    optimizer.zero_grad()
    loss.backward()
    optimizer.step()

    # Print loss every 2000 epochs to monitor training progress
    if (epoch + 1) % 2000 == 0:
        print(f'Epoch [{epoch+1}/{epochs}], Loss: {loss.item():.8f}')

# 5. Results
# Extract final parameters from the trained model
a_final, b_final, c_final, P0_final = model.parameters()
print("\n--- Final Parameters ---")
print(f"a: {a_final.item()}")
print(f"b: {b_final.item()}")
print(f"c: {c_final.item()}")
print(f"P0: {P0_final.item()}")

# Evaluate the model
with torch.no_grad(): # Deactivate autograd for evaluation
    y_final_pred_np = model(P_data).numpy()

print("\n--- Model Performance ---")
print("Mean Squared Error:", mean_squared_error(y_data_np, y_final_pred_np))
print("R-squared:", r2_score(y_data_np, y_final_pred_np))


# 6. Plotting
# Generate points for the fitted curve
P_fit_np = np.linspace(min(P_data_np), max(P_data_np), 100).astype(np.float32)
P_fit_tensor = torch.from_numpy(P_fit_np).view(-1, 1)

with torch.no_grad():
    y_fit_np = model(P_fit_tensor).numpy()

# Plotting the data and the fitted curve
plt.figure(figsize=(10, 6))
plt.scatter(P_data_np, y_data_np, color='red', label='Data Points')
plt.plot(P_fit_np, y_fit_np, color='blue', label='Fitted Curve (PyTorch)')
plt.title('Curve Fitting with PyTorch')
plt.xlabel('Pressure (P)')
plt.ylabel('y')
plt.legend()
plt.grid()
plt.show()