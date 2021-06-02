---
# Page settings
title: On Policy Prediction with Approximation - Part 7 # Define a title of your page
description: Kernel-based function approximation, Interest and Emphasis in on-policy learning # Define a description of your page
keywords: Reinforcement Learning # Define keywords for search engines
order: 7 # Define order of this page in list of all documentation documents
comments: false # Set to "true" in order to enable comments on this page. Make sure you properly setup "disqus_forum_shortname" variable in "_config.yml"

# Hero section
hero:
    title: Reinforcement Learning Notes
    text: <h3>Approximate Solution Methods</h3>On Policy Prediction with Approximation
---

## Kernel-based Function Approximation
*Kernel function* is used in a memory-based method to assign weights to the examples $$s^{'} \mapsto g$$ in the database depending on the distance between $$s^{'}$$ and query state $$s$$.

If $$k: \mathcal{S} X \mathcal{S} \rightarrow \mathcal{R}$$, $$k(s, s^{'})$$ is the weight given to data about $$s^{'}$$ in its influence on answering queries about $$s$$.

### Kernel regression
**Kernel regression** is the memory-based method that computes a kernel weighted average of the targets of all examples stored in memory, and then, assigning the result to the query state.

Common kernel is **Gaussian RBF**:
1. *memory-based* $$\rightarrow$$ centered on the states of the stored examples
2. *nonparametric* $$\rightarrow$$ no parameters to learn
3. Response to the query state is given as follows:

$$
  \hat{v}(s, \mathcal{D}) = \sum_{s^{'} \in \mathcal{D}}k(s, s^{'})g(s^{'})
$$

where $$\mathcal{D}$$ is the set of stored examples and,

$$k(s, s^{'}) = \mathbf{x}(s)^T\mathbf{x}(s^{'})$$

## On-policy Learning: Interest and Emphasis
The algorithms considered so far have treated all the states encountered equally, as if they were all equally important. That might not be the case always.

For example:
1. In discounted episodic problems, we may be more interested in accurately valuing early states in the episode than in later states where discounting may have made the rewards much less important to the value of the start state.
2. If an action-value function is being learned, it may be less important to accurately value poor actions whose value is much less than the greedy action.

<div class="callout callout--info">
  <p>Function approximation resources are always limited, and if they were used in a more targeted way, then performance could be improved.</p>
</div>

### Definitions

$$I_t \rightarrow$$ the degree to which we are interested in accurately valuing the state (or state–action pair) at time $$t$$.

$$M_t \rightarrow$$ multiplies the learning update and thus emphasizes or de-emphasizes the learning done at time $$t$$.

$$\mu \rightarrow$$ The distribution $$\mu$$ in the $$\overline{VE}$$ is defined as the distribution of states encountered while following the target policy, weighted by the interest.

The general $$n$$-step learning rule is:
$$
  \mathbf{w}_{t+n} \doteq \mathbf{w}_{t+n-1} + \alpha M_t [G_{t:t+n} - \hat{v}(S_t, \mathbf{w}_{t+n-1})]\bigtriangledown\hat{v}(S_t, \mathbf{w}_{t+n-1}), \hspace{1cm} 0 \leq t < T
$$

where $$M_t = I_t + \gamma^n M_{t-n}, \hspace{1cm} 0 \leq t < T$$

with $$M_t \doteq 0 \hspace{1cm} \forall t < 0$$.

## What's Next?

Next we extend the concepts from parametric approximation of value functions to action-value functions.
<style>
#wrapD3Cube {
    width: 250px;
    height: 213px;
    margin: 20px auto;
    background-color: #EEE;
}
#D3Cube {
    width: 112px;
    height: 112px;
    top: 50px;
    transform-style: preserve-3d;
    -moz-transform-style: preserve-3d;
    -webkit-transform-style: preserve-3d;
    transform: rotateX(-22deg) rotateY(-38deg) rotateZ(0deg);
    -moz-transform: rotateX(-22deg) rotateY(-38deg) rotateZ(0deg);
    -webkit-transform: rotateX(-22deg) rotateY(-38deg) rotateZ(0deg);
    margin: auto;
    position: relative;
    -moz-transform-style: preserve-3d;
    transform-style: preserve-3d;
    -webkit-transition: all 0.5s ease-in-out;
    transition: all 0.5s ease-in-out;
}
#D3Cube > div {
    position: absolute;
    -webkit-transition: all 0.5s ease-in-out;
    transition: all 0.5s ease-in-out;
    width: 112px;
    height: 112px;
    float: left;
    overflow: hidden;
    opacity: 0.85;
}
#side1 {
    transform: rotatex(90deg) translateX(0px) translateY(0px) translateZ(56px);
    -moz-transform: rotatex(90deg) translateX(0px) translateY(0px) translateZ(56px);
    -webkit-transform: rotatex(90deg) translateX(0px) translateY(0px) translateZ(56px);
    background-color: #FFF;
}
#side2 {
    transform: rotateY(-90deg) translateX(0px) translateY(0px) translateZ(56px);
    -moz-transform: rotateY(-90deg) translateX(0px) translateY(0px) translateZ(56px);
    -webkit-transform: rotateY(-90deg) translateX(0px) translateY(0px) translateZ(56px);
    background-color: #ffaf1c;
}
#side3 {
    transform: translateX(0px) translateY(0px) translateZ(56px);
    -moz-transform: translateX(0px) translateY(0px) translateZ(56px);
    -webkit-transform: translateX(0px) translateY(0px) translateZ(56px);
    background-color: #58d568;
}
#side4 {
    transform: rotateY(90deg) translateX(0px) translateY(0px) translateZ(56px);
    -moz-transform: rotateY(90deg) translateX(0px) translateY(0px) translateZ(56px);
    -webkit-transform: rotateY(90deg) translateX(0px) translateY(0px) translateZ(56px);
    background-color: #ed3030;
}
#side5 {
    transform: rotateY(180deg) translateX(0px) translateY(0px) translateZ(56px);
    -moz-transform: rotateY(180deg) translateX(0px) translateY(0px) translateZ(56px);
    -webkit-transform: rotateY(180deg) translateX(0px) translateY(0px) translateZ(56px);
    background-color: #1c5ffe;
}
#side6 {
    transform: rotateX(-90deg) translateX(0px) translateY(0px) translateZ(56px);
    -moz-transform: rotateX(-90deg) translateX(0px) translateY(0px) translateZ(56px);
    -webkit-transform: rotateX(-90deg) translateX(0px) translateY(0px) translateZ(56px);
    background-color: #f2f215;
}
</style>
<script>
  var cubex = 0,    // initial rotation
cubey = 0,
cubez = 0;
function rotate(variableName, degrees) {
    window[variableName] = window[variableName] + degrees;
    rotCube(cubex, cubey, cubez);
}
function rotCube(degx, degy, degz){
    segs = "rotateX("+degx+"deg) rotateY("+degy+"deg) rotateZ("+degz+"deg) translateX(0) translateY(0) translateZ(0)";
    $('#D3Cube').css({"transform":segs});
}
function turnRight() {
    rotate("cubey", 90);
}
function turnLeft() {
    rotate("cubey", -90);
}
function flipCube() {
    rotate("cubez", -180);
}

</script>
<div id="wrapD3Cube">
    <div id="D3Cube">
        <div id="side1"></div>
        <div id="side2"></div>
        <div id="side3"></div>
        <div id="side4"></div>
        <div id="side5"></div>
        <div id="side6"></div>
    </div>
</div>
<p style="text-align: center;">
    <a onclick="turnLeft()">Left</a>
    <a onclick="turnRight()">Right</a> <br />
    <a onclick="flipCube()">Flip</a>
</p>
