---
# Page settings
title: On Policy Prediction with Approximation - Part 5 # Define a title of your page
description: Step-size parameter selection for linear methods, ways to approximate nonlinear functions  # Define a description of your page
keywords: Reinforcement Learning # Define keywords for search engines
order: 5 # Define order of this page in list of all documentation documents
comments: false # Set to "true" in order to enable comments on this page. Make sure you properly setup "disqus_forum_shortname" variable in "_config.yml"

# Hero section
hero:
    title: Reinforcement Learning Notes
    text: <h3>Approximate Solution Methods</h3>On Policy Prediction with Approximation
---

## Selecting Step-Size Parameters Manually

To set the the step-size parameter of linear SGD methods:

$$
    \alpha \doteq (\tau\mathop{\mathbb{E}}[x^Tx])^{-1}
$$

where $$x$$ is a random feature vector chosen from the same distribution as input vectors will be in the SGD. 

<div class="callout callout--info">
    <p>This method works best if the feature vectors do not vary greatly in length; ideally x<sup>T</sup>x is a constant.</p>
</div>

## Nonlinear Function Approximation

Artificial neural networks (ANNs) are widely used for non-linear function approximation.

**Hidden layers**: Each unit's output = a nonlinear function being applied to the weighted sum of the inputs. The nonlinear function is called the *activation function*.

**Input layer**: Activations are the externally-supplied values that are the inputs to the function to be approximated.

**Output layer**: Activation of each unit is a nonlinear function of the activation patterns over the network's input units.

### Why is nonlinearity essential in an activation function?

If all the units in a multi-layer feedforward ANN have linear activation functions, then the entire network is equivalent to a network with no hidden layers as linear functions of linear functions are themselves linear.

### How to deal with overfitting during function approximation?

#### 1. **Cross Validation**
Stopping training when performance begins to decrease on validation data different from the training data
#### 2. **Regularization**
Modifying the objective function to discourage complexity of the approximation 
#### 3. **Weight Sharing**
Introducing dependencies among the weights to reduce the number of degrees of freedom
#### 4. **Dropout**
During training, units are randomly removed from the network (dropped out) along with their connections, which is equivalent to training a large number of “thinned” networks. Combining the results of these thinned networks at test time can improve generalization performance. The dropout method efficiently approximates this combination by multiplying each outgoing weight of a unit by the probability that that unit was retained during training.
#### 5. **Deep Belief Networks**
Deepest layers are trained one at a time using an unsupervised learning algorithm to extract features, and then inputs provided by one trained layer are used to train the next deepest layer and so on.
<div class="callout callout--info">
    <p>Studies show that this approach generally works much better than backpropagation with weights initialized with random values. The better performance of networks trained with weights initialized this way could be due to many factors, but one idea is that this method places the network in a region of weight space from which a gradient-based algorithm can make good progress.</p>
</div>

#### 6. **Batch Normalization**
Outputs are normalized before feeding into the following layers.

#### 7. **Deep Residual Learning**
A skip connection is made between the input to the block and it's output to learn a residual function.

## What's Next?
Next we will discuss about methods for linear function approximation with more computation unlike the ones we have discussed so far that required computation per time step proportional to the number of parameters.