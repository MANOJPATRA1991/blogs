---
# Page settings
title: On Policy Prediction with Approximation - Part 2 # Define a title of your page
description: Stochastic-gradient and Semi-gradient Methods  # Define a description of your page
keywords: Reinforcement Learning # Define keywords for search engines
order: 2 # Define order of this page in list of all documentation documents
comments: false # Set to "true" in order to enable comments on this page. Make sure you properly setup "disqus_forum_shortname" variable in "_config.yml"

# Hero section
hero:
    title: Reinforcement Learning Notes
    text: <h3>Approximate Solution Methods</h3>On Policy Prediction with Approximation
---

## Stochastic-gradient and Semi-gradient Methods

1. Most widely used of all function approximation methods
2. Particularly well suited to online reinforcement learning

### Stochastic-gradient methods

In GD methods, 
1. $$ \mathbf{w} \doteq (\mathcal{w_1}, \mathcal{w_2}, ..., \mathcal{w_d})^T$$, a column vector
2. $$\hat{v}(s, \mathbf{w})$$ is a differentiable function of $$\mathbf{w} \hspace{0.5cm} \forall s \in \mathcal{S}$$

For a series of discrete time steps, $$t=0,1,2,3,...,$$, assuming we observe a new example $$\mathcal{S_t} \mapsto v_\pi(\mathcal{S_t})$$ on each step and to generalize well across all states, a good strategy in this case is to try to minimize error on the observed examples.

$$
    \mathbf{w_{t+1}} \doteq \mathbf{w_t} - \frac{1}{2}\alpha\bigtriangledown[v_\pi(\mathcal{S_t}) - \hat{v}(\mathcal{S_t}, \mathbf{w_t})]^2 = \mathbf{w_t} + \alpha[v_\pi(\mathcal{S_t}) - \hat{v}(\mathcal{S_t}, \mathbf{w_t})]\bigtriangledown\hat{v}(\mathcal{S_t}, \mathbf{w_t})
$$

where $$\alpha > 0$$ and $$\bigtriangledown\mathcal{f(\mathbf{w})} = (\frac{\delta f(\mathbf{w})}{\delta \mathcal{w_1}}, \frac{\delta f(\mathbf{w})}{\delta \mathcal{w_2}}, ..., \frac{\delta f(\mathbf{w})}{\delta \mathcal{w_d}})^T$$.

To assure convergence to a local optimum, $$\alpha$$ must decrease in such a way to satisy $$\sum_{n=1}^\infty \alpha_n(a) = \infty$$ and $$\sum_{n=1}^\infty \alpha_n^2(a) < \infty$$.

In case the target output is not the true value, i.e., $$\mathcal{S_t} \mapsto \mathcal{U_t}$$ wher $$\mathcal{U_t} \in \mathbb{R}$$,

$$
    \mathbf{w_{t+1}} \doteq \mathbf{w_t} + \alpha[\mathcal{U_t} - \hat{v}(\mathcal{S_t}, \mathbf{w_t})]\bigtriangledown\hat{v}(\mathcal{S_t}, \mathbf{w_t})
$$

If $$\mathcal{U_t}$$ is an unbiased estimate, then $$\mathbf{w_t}$$ is guaranteed to converge to a local optimum.

<div class="callout callout--info">
    <p> An estimator of a given parameter is said to be unbiased if its expected value is equal to the true value of the parameter. In other words, an estimator is unbiased if it produces parameter estimates that are on average correct.</p>
</div>

![GD Func. approx.](https://res.cloudinary.com/de34f8lhj/image/upload/v1598306468/GD_FA_swlsoo.jpg)

### Semi-gradient methods

Bootstrapping methods are called semi-gradient methods as they take into account the effect of changing the weight vector $$\mathbf{w_t}$$ on the estimate, but ignore its effect on the target.

![Semi-gradient func. approx.](https://res.cloudinary.com/de34f8lhj/image/upload/v1598306983/SG_FA_q1mcyb.jpg)

### State aggregation

State aggregationis a simple form of generalizing function approximation in which 

1. states are grouped together, with one estimated value (one component of the weight vector $$\mathbf{w}$$) for each group. 
2. The value of a state is estimated as its group’s component, and when the state is updated, that component alone is updated. 
3. $$\hat{v}(\mathcal{S_t},\mathbf{w_t})$$ is 1 for $$\mathcal{S_t}$$’s group’s component and 0 for the other components.

## What's Next?

Next we will look at linear methods of function approximation.