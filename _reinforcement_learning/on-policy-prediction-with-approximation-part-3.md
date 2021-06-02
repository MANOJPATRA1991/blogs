---
# Page settings
title: On Policy Prediction with Approximation - Part 3 # Define a title of your page
description: Linear methods, n-step semi-gradient TD  # Define a description of your page
keywords: Reinforcement Learning # Define keywords for search engines
order: 3 # Define order of this page in list of all documentation documents
comments: false # Set to "true" in order to enable comments on this page. Make sure you properly setup "disqus_forum_shortname" variable in "_config.yml"

# Hero section
hero:
    title: Reinforcement Learning Notes
    text: <h3>Approximate Solution Methods</h3>On Policy Prediction with Approximation
---

## Linear Methods

$$\mathbf{x}(s) \rightarrow$$ *feature vector* representing state $$s$$; same number of components as weight vector $$\mathbf{w}$$.

$$\mathbf{x}(s) \doteq (x_1(s), x_2(s), ..., x_d(s))^T$$, where each $$x_i(s)$$ is the value of a function $$x_i: \mathbb{S} \rightarrow \mathbb{R}$$.

Linear methods approximate state-value function is given as

$$\hat{v}(s, \mathbf{w}) \doteq \mathbf{w}^T\mathbf{x}(s) \doteq \sum_{i=1}^dw_ix_i(s)$$

$$\bigtriangledown\hat{v}(s, \mathbf{w}) \doteq x(s)$$

The general SGD update for linear case can now be written as:

$$
    \mathbf{w_{t+1}} \doteq \mathbf{w_t} + \alpha[\mathcal{U_t} - \hat{v}(\mathcal{S_t}, \mathbf{w_t})]x(\mathcal{S_t})
$$

In the linear case there is only one optimum (or, in degenerate cases, one set of equally good optima), and thus any method that is guaranteed to converge to or near a local optimum is automatically guaranteed to converge to or near the global optimum.

Under linear function approximation,
1. Gradient MC method converges to global optimum of the $$\overline{VE}$$ if $$\alpha$$ is reduced over time according to the usual convergence conditions.
2. For the semi-gradient TD(0) algorithm, if the system converges, it must converge to the weight vector $$\mathbf{w}_{TD} \doteq \mathbf{A}^{-1}\mathbf{b}$$, which is also known as the *TD fixed point*.

**Proof**:
$$
    \mathbf{w}_{t+1} \doteq \mathbf{w} + \alpha(R_{t+1} + \gamma\mathbf{w}_t^T\mathbf{x}_{t+1} - \mathbf{w}_t^T\mathbf{x}_t)\mathbf{x}_t
$$

$$\mathbb{E}[\mathbf{w}_{t+1} \vert \mathbf{w}_t] = \mathbf{w}_t + \alpha(\mathbf{b} - \mathbf{A}\mathbf{w}_t) $$

where $$\mathbf{b} \doteq \mathbb{E}[R_{t+1}\mathbf{x}_t]$$ and $$\mathbf{A} \doteq \mathbb{E}[\mathbf{x}_t(\mathbf{x}_t - \gamma\mathbf{x}_{t+1})^T]$$

For convergence, $$\mathbf{b} - \mathbf{A}\mathbf{w}_{TD} = 0 \Rightarrow \mathbf{w}_{TD} \doteq \mathbf{A}^{-1}\mathbf{b}$$

At the TD fixed point, $$\overline{VE}(\mathbf{w}_{TD}) \leq \frac{1}{1 - \gamma}min_{\mathbf{w}}\overline{VE}(\mathbf{w})$$

## n-step Semi-gradient TD for estimating approximate value function

![n-step Semi-gradient TD](https://res.cloudinary.com/de34f8lhj/image/upload/v1598375852/SG_TD_n_a9qbwz.jpg)

The key equations in this algorithm are:

$$
    \mathbf{w}_{t+n} \doteq \mathbf{w}_{t+n-1} + \alpha[G_{t:t+n} - \hat{v}(S_t, \mathbf{w}_{t+n-1})]\bigtriangledown\hat{v}(S_t, \mathbf{w}_{t+n-1}), \hspace{1cm} 0 \leq t < T
$$

where the $$n$$-step return is generalized to the

$$
    G_{t:t+n} \doteq R_{t+1} + \gamma R_{t+2} + ... + \gamma^{n-1} R_{t+n} + \gamma^n \hat{v}(S_{t+n}, \mathbf{w}_{t+n-1}), \hspace{1cm} 0 \leq t < T - n
$$

## What's Next?

Next we discuss feature construction for linear methods.