---
mainImage: ../../../images/part-11.svg
part: 11
letter: a
lang: zh
---

<div class="content">

<!-- During this part, you will build a robust <i>deployment pipeline</i> to a ready made [example project](https://github.com/fullstack-hy2020/full-stack-open-pokedex) starting in [exercise 11.2](/en/part11/getting_started_with_git_hub_actions#exercise-11-2). You will [fork](https://docs.github.com/en/free-pro-team@latest/github/getting-started-with-github/fork-a-repo) the example project and that will create you a personal copy of the repository. In the [last two](/en/part11/expanding_further#exercises-11-20-22) exercises, you will build another deployment pipeline for some of <i>your own</i> previously created app!-->
 在这一部分中，你将从[练习11.2](/en/part11/getting_started_with_git_hub_actions#exercise-11-2)开始，建立一个强大的<i>部署管道</i>到一个现成的[实例项目](https://github.com/fullstack-hy2020/full-stack-open-pokedex)。你将[fork](https://docs.github.com/en/free-pro-team@latest/github/getting-started-with-github/fork-a-repo)这个例子项目，这将为你创建一个仓库的个人副本。在[最后两个](/en/part11/expanding_further#exercises-11-20-22)练习中，你将为一些<i>你自己的</i>先前创建的应用构建另一个部署管道

<!-- There are 21 exercises in this part, and you need to complete <i>each</i> exercise for completing the course. Exercises are submitted via [the submissions system](https://studies.cs.helsinki.fi/stats/courses/fs-cicd) just like in the previous parts, but unlike parts 0 to 7, the submission goes to a different "course instance".-->
 这一部分有21个练习，你需要完成<i>每个</i>练习才能完成课程。练习是通过[提交系统](https://studies.cs.helsinki.fi/stats/courses/fs-cicd)提交的，就像前几部分一样，但与第0至7部分不同的是，提交到一个不同的 "课程实例"。

<!-- This part will rely on many concepts covered in the previous parts of the course. It is recommended that you finish at least parts 0 to 5 before starting this part.-->
 这一部分将依赖于课程前几部分所涉及的许多概念。建议你在开始这一部分之前，至少要完成第0至5部分。

<!-- Unlike the other parts of this course, you do not write many lines of code in this part, it is much more about configuration. Debugging code might be hard but debugging configurations is way harder, so in this part, you need lots of patience and discipline!-->
 与本课程的其他部分不同，你在这部分不会写很多行代码，它更多的是关于配置。调试代码可能很难，但调试配置就更难了，所以在这一部分，你需要大量的耐心和纪律性!

### Getting software to production

<!-- Writing software is all well and good but nothing exists in a vacuum. Eventually, we'll need to deploy the software to production, i.e. give it to the real users. After that we need to maintain it, release new versions, and work with other people to expand that software.-->
 编写软件是件好事，但没有什么是存在于真空中的。最终，我们需要将软件部署到生产中，也就是说，将它交给真正的用户。在那之后，我们需要维护它，发布新的版本，并与其他人合作来扩展该软件。

<!-- We've already used GitHub to store our source code, but what happens when we work within a team with more developers?-->
 我们已经使用GitHub来存储我们的源代码，但当我们在一个有更多开发者的团队中工作时，会发生什么？

<!-- Many problems may arise when several developers are involved. The software might work just fine on <i>my computer</i>, but maybe some of the other developers are using a different operating system or different library versions. It is not uncommon that a code works just fine in one developer's machine but another developer can not even get it started. This is often called the "works on my machine" problem.-->
 当几个开发人员参与时，可能会出现许多问题。该软件可能在<i>我的电脑上</i>工作得很好，但也许其他一些开发者使用的是不同的操作系统或不同的库版本。一个代码在一个开发者的机器上工作得很好，但另一个开发者甚至无法启动它，这种情况并不罕见。这通常被称为 "在我的机器上工作 "的问题。

<!-- There are also more involved problems. If two developers are both working on changes and they haven't decided on a way to deploy to production, whose changes get deployed? How would it be possible to prevent one developer's changes from overwriting another's?-->
 也有一些更复杂的问题。如果两个开发者都在做修改，而他们还没有决定如何部署到生产中，那么谁的修改会被部署？怎样才能防止一个开发者的修改覆盖另一个开发者的修改？

<!-- In this part, we'll cover ways to work together and build and deploy software in a strictly defined way so that it's clear <i>exactly</i> what will happen under any given circumstance.-->
 在这一部分中，我们将讨论如何共同工作，并以严格定义的方式构建和部署软件，以便清楚地知道在任何特定情况下会发生什么。

### Some useful terms

<!-- In this part we'll be using some terms you may not be familiar with or you may not have a good understanding of. We'll discuss some of these terms here. Even if you are familiar with the terms, give this section a read so when we use the terms in this part, we're on the same page.-->
 在这部分中，我们将使用一些你可能不熟悉的术语，或者你可能没有很好的理解。我们将在这里讨论其中一些术语。即使你熟悉这些术语，也要读一读这部分，这样当我们在这部分使用这些术语时，我们就会在同一页上。

#### Branches

<!-- Git allows multiple copies, streams, or versions of the code to co-exist without overwriting each other. When you first create a repository, you will be looking at the main branch (usually in git, we call this <i>master</i> or <i>main</i>, but that does vary in older projects). This is fine if there's only one developer for a project and that developer only works on one feature at a time.-->
 Git允许代码的多个副本、流或版本共存而不互相覆盖。当你第一次创建一个仓库时，你会看到主分支（通常在git中，我们称之为<i>master</i>或<i>main</i>，但这在老项目中确实有所不同）。如果一个项目只有一个开发者，而且这个开发者每次只做一个功能，那么这就很好。

<!-- Branches are useful when this environment becomes more complex. In this context, each developer can have one or more branches. Each branch is effectively a copy of the main branch with some changes that make it diverge from it. Once the feature or change in the branch is ready it can be <i>merged</i> back into the main branch, effectively making that feature or change part of the main software. In this way, each developer can work on their own set of changes and not affect any other developer until the changes are ready.-->
当这种环境变得更加复杂时，分支就很有用。在这种情况下，每个开发人员可以有一个或多个分支。每个分支实际上是主分支的一个副本，其中的一些变化使其与主分支相背离。一旦分支中的功能或变化准备就绪，就可以<i>合并</i>回到主分支中，有效地使该功能或变化成为主软件的一部分。通过这种方式，每个开发者都可以在自己的修改集上工作，在修改准备好之前不影响其他开发者。

<!-- But once one developer has merged their changes into the main branch, what happens to the other developers' branches? They are now diverging from an older copy of the main branch. How will the developer on the later branch know if their changes are compatible with the current state of the main branch? That is one of the fundamental questions we will be trying to answer in this part.-->
 但是，一旦一个开发者将他们的修改合并到主分支，其他开发者的分支会发生什么？他们现在正从主分支的一个较早的副本中分化出来。后面那个分支的开发者如何知道他们的修改是否与主分支的当前状态兼容？这就是我们在这一部分要回答的基本问题之一。

<!-- You can read more about branches e.g. from [here](https://www.atlassian.com/git/tutorials/using-branches).-->
 你可以从[这里](https://www.atlassian.com/git/tutorials/using-branches)阅读更多关于分支的信息。

#### Pull request

<!-- In GitHub merging a branch back to the main branch of software is quite often happening using a mechanism called [pull request](https://docs.github.com/en/free-pro-team@latest/github/collaborating-with-issues-and-pull-requests/about-pull-requests), where the developer who has done some changes is requesting the changes to be merged to the main branch. Once the pull request, or PR as it's often called, is made or <i>opened</i>, another developer checks that all is ok and <i>merges</i> the PR.-->
 在GitHub中，将一个分支合并到软件的主干分支，通常是通过一个叫做[pull request](https://docs.github.com/en/free-pro-team@latest/github/collaborating-with-issues-and-pull-requests/about-pull-requests)的机制实现的，在这个机制中，做了一些修改的开发者要求将这些修改合并到主干分支。一旦提出了拉动请求，也就是通常所说的PR，或者<i>打开了</i>，另一个开发者就会检查是否一切正常，然后<i>合并</i>PR。

<!-- If you have proposed changes to the material of this course, you have already made a pull request!-->
 如果你对本课程的材料提出了修改意见，你就已经提出了一个拉动请求!

#### Build

<!-- The term "build" has different meanings in different languages. In some interpreted languages such as Python or Ruby , there is actually no need for a build step at all.-->
 术语 "构建 "在不同语言中有不同的含义。在一些解释型语言中，如Python或Ruby，实际上根本就不需要构建步骤。

<!-- In general when we talk about building we mean preparing software to run on the platform where it's intended to run. This might mean, for example, that if you've written your application in TypeScript, and you intend to run it on Node, then the build step might be transpiling the TypeScript into JavaScript.-->
 一般来说，当我们谈论构建时，我们指的是准备软件在它要运行的平台上运行。这可能意味着，例如，如果你用TypeScript编写了你的应用，而你打算在Node上运行它，那么构建步骤可能是将TypeScript转译成JavaScript。

<!-- This step is much more complicated (and required) in compiled languages such as C and Rust where the code needs to be compiled into an executable.-->
 在C和Rust这样的编译语言中，这个步骤要复杂得多（而且需要），因为代码需要被编译成可执行文件。

<!-- In [part 7](/en/part7/webpack) we had a look at [webpack](https://webpack.js.org/) that is the current de facto tool for building a production version of a React or any other frontend JavaScript or TypeScript codebase.-->
 在[第7章节](/en/part7/webpack)中，我们看了一下[webpack](https://webpack.js.org/)，它是目前构建React或任何其他前端JavaScript或TypeScript代码库的生产版本的事实工具。

#### Deploy

<!-- Deployment refers to putting the software where it needs to be for the end-user to use it. In the case of libraries, this may simply mean pushing an npm package to a package archive (such as npmjs.com) where other users can find it and include it in their software.-->
 部署指的是把软件放在最终用户需要使用的地方。在库的情况下，这可能只是意味着将一个npm包推送到一个包存档（如npmjs.com），其他用户可以找到它并将其包含在他们的软件中。

<!-- Deploying a service (such as a web app) can vary in complexity. In [part 3](/en/part3/deploying_app_to_internet) our deployment workflow involved running some scripts manually and pushing the repository code to [Heroku](https://www.heroku.com/) hosting service.-->
 部署一个服务（如网络应用）的复杂程度可能不同。在[第三章节](/en/part3/deploying_app_to_internet)中，我们的部署工作流程涉及手动运行一些脚本，并将版本库代码推送到[Heroku](https://www.heroku.com/)托管服务。

<!-- In this part, we'll develop a simple "deployment pipeline" that deploys each commit of your code automatically to Heroku <i>if</i> the committed code does not break anything.-->
 在这一部分中，我们将开发一个简单的 "部署管道"，将你每次提交的代码自动部署到Heroku，<i>如果</i>提交的代码没有破坏任何东西。

<!-- Deployments can be significantly more complex, especially if we add requirements such as "the software must be available at all times during the deployment" (zero downtime deployments) or if we have to take things like [database migrations](/en/part13/migrations_many_to_many_relationships#migrations) into account. We won't cover complex deployments like those in this part but it's important to know that they exist.-->
 部署可以明显地更复杂，特别是如果我们增加了诸如 "软件在部署期间必须一直可用"（零停机部署）的要求，或者如果我们必须考虑到诸如[数据库迁移](/en/part13/migrations_many_to_many_relationships#migrations)的事情。在这一部分中，我们不会涉及像那些复杂的部署，但知道它们的存在是很重要的。

### What is CI?

<!-- The strict definition of CI (Continuous Integration) and the way the term is used in the industry are quite different. One influential but quite early (from year 2006) discussion of the topic is in [Martin Fowler's blog](https://www.martinfowler.com/articles/continuousIntegration.html).-->
 CI（持续集成）的严格定义和该术语在业界的使用方式有很大不同。一个有影响力但相当早的（2006年）关于这个话题的讨论是在[Martin Fowler's blog](https://www.martinfowler.com/articles/continuousIntegration.html)。

<!-- Strictly speaking, CI refers to <a href='https://www.atlassian.com/continuous-delivery/principles/continuous-integration-vs-delivery-vs-deployment'>merging developer changes to the main branch</a> often, Wikipedia even helpfully suggests: "several times a day". This is usually true but when we refer to CI in industry, we're usually talking about what happens after the actual merge happens.-->
 严格来说，CI指的是<a href="https://www.atlassian.com/continuous-delivery/principles/continuous-integration-vs-delivery-vs-deployment">经常将开发人员的修改合并到主分支</a>中，维基百科甚至帮助性地建议。维基百科甚至建议："每天数次"。这通常是正确的，但是当我们在行业中提到CI时，我们通常在谈论实际合并发生后的情况。

<!-- We'd likely want to do some of these steps:-->
 我们可能想做其中的一些步骤。
<!--  - Lint: to keep our code clean and maintainable-->
 - 提示：保持我们的代码清洁和可维护。
<!--  - Build: put all of our code together into software-->
 - 构建：将我们所有的代码整合成软件
<!--  - Test: to ensure we don't break existing features-->
 - 测试：以确保我们不会破坏现有的功能
<!--  - Package: Put it all together in an easily movable batch-->
 -打包。把它全部放在一个容易移动的批次中
<!--  - Upload/Deploy: Make it available to the world-->
 - 上传/部署。将它提供给全世界

<!-- We'll discuss each of these steps (and when they're suitable) in more detail later. What is important to remember is that this process should be strictly defined.-->
 我们将在后面更详细地讨论这些步骤中的每一个（以及它们何时适合）。要记住的是，这个过程应该被严格定义。

<!-- Usually, strict definitions act as a constraint on creativity/development speed. This, however, should usually not be true for CI. This strictness should be set up in such a way as to allow for easier development and working together. Using a good CI system (such as GitHub Actions that we'll cover in this part) will allow us to do this all automagically.-->
 通常，严格的定义是对创造力/开发速度的一种限制。然而，对于CI来说，这通常不应该是真的。这种严格性应该以允许更容易开发和合作的方式来设置。使用一个好的CI系统（比如我们将在这部分介绍的GitHub Actions）将使我们能够自动地完成这些工作。

### Packaging and Deployment as a part of CI

<!-- It may be worthwhile to note that packaging and especially deployment are sometimes not considered to fall under the umbrella of CI. We'll add them in here because in the real world it makes sense to lump it all together. This is partly because they make sense in the context of the flow and pipeline (I want to get my code to users) and partially because these are in fact the most likely point of failure.-->
 可能值得注意的是，打包和特别是部署有时不被认为是属于CI的范畴。我们将它们添加到这里，因为在现实世界中，将它们放在一起是有意义的。部分原因是它们在流程和管道的背景下是有意义的（我想把我的代码交给用户），部分原因是这些实际上是最有可能发生故障的点。

<!-- The packaging is often an area where issues crop up in CI as this isn't something that's usually tested locally. It makes sense to test the packaging of a project during the CI workflow even if we don't do anything with the resulting package. With some workflows, we may even be testing the already built packages. This assures us that we have tested the code in the same form as what will be deployed to production.-->
 包装往往是CI中出现问题的一个领域，因为这不是通常在本地测试的东西。在CI工作流程中测试项目的包装是有意义的，即使我们不对产生的包做任何事情。在某些工作流程中，我们甚至可以测试已经建立的包。这就保证了我们已经测试了与将被部署到生产中的代码相同的形式。

<!-- What about deployment then? We'll talk about consistency and repeatability at length in the coming sections but we'll mention here that we want a process that always looks the same, whether we're running tests on a development branch or the main branch. In fact, the process may <i>literally</i> be the same with only a check at the end to determine if we are on the main branch and need to do a deployment. In this context, it makes sense to include deployment in the CI process since we'll be maintaining it at the same time we work on CI.-->
 那部署呢？我们将在接下来的章节中详细讨论一致性和可重复性，但我们在这里要提到的是，无论我们是在开发分支还是在主分支上运行测试，我们都希望有一个看起来相同的过程。事实上，这个过程可能<i>实际上</i>是一样的，只是在最后进行检查，以确定我们是否在主分支上，并需要进行部署。在这种情况下，将部署包括在 CI 过程中是有意义的，因为我们在进行 CI 工作的同时，也在维护它。

#### Is this CD thing related?

<!-- The terms <i>Continuous Delivery</i> and <i>Continuous Deployment</i> (both of which have the acronym CD) are often used when one talks about CI that also takes care of deployments. We won't bore you with the exact definition (you can use e.g. [Wikipedia](https://en.wikipedia.org/wiki/Continuous_delivery) or [another Martin Fowler blog post](https://martinfowler.com/bliki/ContinuousDelivery.html)) but in general, we refer to CD as the practice where the main branch is kept deployable at all times. In general, this is also frequently coupled with automated deployments triggered from merges into the main branch.-->
 术语<i>连续交付</i>和<i>连续部署</i>（两者的首字母缩写都是CD）经常被用于谈论也负责部署的CI。我们不会用确切的定义来烦扰你（你可以使用例如[Wikipedia](https://en.wikipedia.org/wiki/Continuous_delivery)或[另一篇Martin Fowler的博文](https://martinfowler.com/bliki/ContinuousDelivery.html)），但一般来说，我们把CD称为主分支始终保持可部署的做法。一般来说，这也经常与由合并到主分支所引发的自动部署结合起来。

<!-- What about the murky area between CI and CD? If we, for example, have tests that must be run before any new code can be merged to the main branch, is this CI because we're making frequent merges to the main branch, or is it CD because we're making sure that the main branch is always deployable?-->
 CI和CD之间的模糊区域如何处理？例如，如果我们在任何新代码被合并到主干分支之前必须运行测试，那么这是CI，因为我们经常合并到主干分支，还是CD，因为我们要确保主干分支总是可以部署的？

<!-- So, some concepts frequently cross the line between CI and CD and, as we discussed above, deployment sometimes makes sense to consider CD as part of CI. This is why you'll often see references to CI/CD to describe the entire process. We'll use the terms "CI" and "CI/CD" interchangeably in this part.-->
 所以，有些概念经常跨越CI和CD之间的界限，正如我们上面所讨论的，部署有时是有意义的，可以将CD视为CI的一部分。这就是为什么你会经常看到用CI/CD来描述整个过程。在这一部分，我们将交替使用 "CI "和 "CI/CD "这两个术语。

### Why is it important?

<!-- Above we talked about the "works on my machine" problem and the deployment of multiple changes, but what about other issues. What if Alice committed directly to the main branch? What if Bob used a branch but didn't bother to run tests before merging? What if Charlie tries to build the software for production but does so with the wrong parameters?-->
 上面我们谈到了 "在我的机器上工作 "的问题和多个变化的部署，但其他问题呢？如果 Alice 直接提交到主分支怎么办？如果Bob使用了一个分支，但在合并前没有费心去运行测试，那该怎么办？如果Charlie试图为生产构建软件，但用了错误的参数，怎么办？

<!-- With the use of continuous integration and systematic ways of working, we can avoid these.-->
 通过使用持续集成和系统化的工作方式，我们可以避免这些。
<!--  - We can disallow commits directly to the main branch-->
 - 我们可以不允许直接提交到主分支上
<!--  - We can have our CI process run on all Pull Requests (PRs) against the main branch and allow merges only when our desired conditions are met e.g. tests pass-->
 - 我们可以让CI流程在所有针对主分支的拉动请求（PR）上运行，只有在满足我们所需的条件时才允许合并，如测试通过。
<!--  - We can build our packages for production in the known environment of the CI system-->
 - 我们可以在CI系统的已知环境中为生产构建我们的包。

<!-- There are other advantages to extending this setup:-->
 扩展这个设置还有其他好处。
<!--  - If we use CD with deployment every time there is a merge to the main branch, then we know that it will always work in production-->
 - 如果我们在每次合并到主分支时都使用CD与部署，那么我们就知道它在生产中总是有效的。
<!--  - If we only allow merges when the branch is up to date with the main branch, then we can be sure that different developers don't overwrite each other's changes-->
 - 如果我们只允许在该分支与主分支保持一致的时候进行合并，那么我们就可以确保不同的开发者不会互相覆盖对方的修改。

<!-- Note that in this part we are assuming that the main branch (named <i>master</i> or <i>main</i>) contains the code that is running in production. The numerous different [workflows](https://www.atlassian.com/git/tutorials/comparing-workflows) one can use with git, e.g. in some cases, it may be a specific <i>release branch</i> that contains the code which is running in production.-->
 注意，在这部分中，我们假设主分支（名为<i>master</i>或<i>main</i>）包含了正在生产中运行的代码。人们可以使用git的许多不同的[工作流程](https://www.atlassian.com/git/tutorials/comparing-workflows)，例如，在某些情况下，可能是一个特定的<i>release分支</i>包含了正在生产中运行的代码。

### Important principles

<!-- It's important to remember that CI/CD is not the goal. The goal is better, faster software development with fewer preventable bugs and better team cooperation.-->
 重要的是要记住，CI/CD不是目标。目标是更好、更快的软件开发，减少可预防的错误和更好的团队合作。

<!-- To that end, CI should always be configured to the task at hand and the project itself. The end goal should be kept in mind at all times. You can think of CI as the answer to these questions:-->
 为此，CI应该始终根据手头的任务和项目本身进行配置。最终目标应始终铭记在心。你可以把CI看成是这些问题的答案。
<!--  - How to make sure that tests run on all code that will be deployed?-->
 - 如何确保在所有将要部署的代码上运行测试？
<!--  - How to make sure that the main branch is deployable at all times?-->
 - 如何确保主分支在任何时候都是可部署的？
<!--  - How to ensure that builds will be consistent and will always work on the platform it'd be deploying to?-->
 - 如何确保构建是一致的，并且总是在它要部署的平台上工作？
<!--  - How to make sure that the changes don't overwrite each other?-->
 - 如何确保这些变化不会相互覆盖？
<!--  - How to make deployments happen at the click of a button or automatically when one merges to the main branch?-->
 - 如何在点击按钮时进行部署，或者在一个分支合并到主分支时自动部署？

<!-- There even exists scientific evidence on the numerous benefits the usage of CI/CD has. According to a large study reported in the book [Accelerate: The Science of Lean Software and DevOps: Building and Scaling High Performing Technology Organizations](https://itrevolution.com/product/accelerate/), the use of CI/CD correlate heavily with organizational success (e.g. improves profitability and product quality, increases market share, shortens the time to market). CI/CD even makes developers happier by reducing their burnout rate. The results summarized in the book are also reported in scientific articles such as [this](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2681909).-->
 甚至有科学证据表明CI/CD的使用有很多好处。根据[《加速》](https://itrevolution.com/product/accelerate/)一书中报告的一项大型研究。，CI/CD的使用与组织的成功有很大关系（例如，提高利润率和产品质量，增加市场份额，缩短上市时间）。CI/CD甚至通过减少开发人员的倦怠率而使他们更快乐。书中总结的结果在科学文章中也有报道，如[这个](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2681909)。
#### Documented behavior

<!-- There's an old joke that a bug is just an "undocumented feature". We'd like to avoid that. We'd like to avoid any situations where we don't know the exact outcome. For example, if we depend on a label on a PR to define whether something is a "major", "minor" or "patch" release (we'll cover the meanings of those terms later), then it's important that we know what happens if a developer forgets to put a label on their PR. What if they put a label on after the build/test process has started? What happens if the developer changes the label mid-way through, which one is the one that actually releases?-->
 有一个老笑话说，错误只是一个 "未记录的功能"。我们想避免这种情况。我们希望避免任何我们不知道确切结果的情况。例如，如果我们依靠PR上的标签来定义某个东西是 "主要"、"次要 "还是 "补丁 "版本（我们将在后面介绍这些术语的含义），那么我们必须知道，如果开发者忘记在他们的PR上贴标签会发生什么。如果他们在构建/测试过程开始后才贴上标签呢？如果开发者在中途改变了标签会怎样，哪一个才是真正的发布？

<!-- It's possible to cover all cases you can think of and still have gaps where the developer will do something "creative" that you didn't think of, so it's important to have the process fail safely in this case.-->
 你有可能覆盖所有你能想到的情况，但仍然有差距，即开发者会做一些你没有想到的 "创造性 "的事情，所以在这种情况下，让程序安全失败是很重要的。

<!-- For example, if we have the case mentioned above where the label changes midway through the build. If we didn't think of this beforehand, it might be best to fail the build and alert the user if something we weren't expecting happened. The alternative, where we deploy the wrong type of version anyway, could result in bigger problems, so failing and notifying the developer is the safest way out of this situation.-->
 例如，如果我们有上面提到的情况，标签在构建过程中发生变化。如果我们事先没有想到这一点，那么如果发生了我们没有预料到的事情，最好是让构建失败并提醒用户。另一种情况是，我们还是部署了错误的版本，这可能会导致更大的问题，所以失败并通知开发者是解决这种情况的最安全的方法。

#### Know the same thing happens every time

<!-- We might have the best tests imaginable for our software, tests that catch every possible issue. That's great, but they're useless if we don't run them on the code before it's deployed.-->
 我们可能对我们的软件进行了可以想象的最好的测试，这些测试可以抓住每一个可能的问题。这很好，但如果我们不在代码部署前运行它们，它们就没有用。

<!-- We need to guarantee that the tests will run and we need to be sure that they run against the code that will actually be deployed. For example, it's no use if the tests are <i>only</i> run against Alice's branch if they would fail after merging to the main branch. We're deploying from the main branch so we need to make sure that the tests are run against a copy of the main branch with Alice's changes merged in.-->
 我们需要保证这些测试能够运行，并且我们需要确保它们能够针对实际部署的代码运行。例如，如果测试只针对Alice的分支运行，而在合并到主分支后会失败，那就没有用。我们要从主干分支部署，所以我们需要确保测试是针对主干分支的副本进行的，并将 Alice 的修改合并进来。

<!-- This brings us to a critical concept. We need to make sure that the same thing happens every time. Or rather that the required tasks are all performed and in the right order.-->
 这给我们带来了一个关键的概念。我们需要确保每次都发生同样的事情。或者说，所需的任务都是按照正确的顺序进行的。

#### Code always kept deployable

<!-- Having code that's always deployable makes life easier. This is especially true when the main branch contains the code running in the production environment. For example, if a bug is found and it needs to be fixed, you can pull a copy of the main branch (knowing it is the code running in production), fix the bug, and make a pull request back to the main branch. This is relatively straight forward.-->
 拥有始终可部署的代码会使生活更轻松。当主分支包含在生产环境中运行的代码时，这一点尤其正确。例如，如果发现了一个需要修复的错误，你可以从主分支拉出一份副本（知道它是在生产环境中运行的代码），修复这个错误，并向主分支提出拉取请求。这是很直接的做法。

<!-- If, on the other hand, the main branch and production are very different and the main branch is not deployable, then you would have to find out what code <i>is</i> running in production, pull a copy of that, fix the bug, figure out a way to push it back, then work out how to deploy that specific commit. That's not great and would have to be a completely different workflow from a normal deployment.-->
 另一方面，如果主干分支和生产分支差别很大，而且主干分支不能部署，那么你就必须找出在生产中运行的代码，拉出一份副本，修复错误，想办法推回，然后再想办法部署那个特定的提交。这不是很好，而且必须是一个与正常部署完全不同的工作流程。

#### Knowing what code is deployed (sha sum/version)

<!-- It's often important to know what is actually running in production. Ideally, as we discussed above, we'd have the main branch running in production. This is not always possible. Sometimes we intend to have the main branch in production but a build fails, sometimes we batch together several changes and want to have them all deployed at once.-->
 知道在生产中实际运行的是什么往往很重要。理想情况下，正如我们上面所讨论的，我们会在生产中运行主分支。这并不总是可行的。有时我们打算让主分支在生产中运行，但构建失败了，有时我们把几个变化批在一起，想让它们一次全部部署。

<!-- What we need in these cases (and is a good idea in general) is to know exactly <i>what code is running in production</i>. Sometimes this can be done with a version number, sometimes it's useful to have the commit SHA sum (uniquely identifying hash of that particular commit in git) attached to the code. We will discuss versioning further [a bit later in this part](/en/part11/keeping_green#versioning).-->
 在这些情况下，我们所需要的（一般来说也是个好主意）是确切地知道<i>哪些代码在生产中运行</i>。有时这可以用版本号来完成，有时将提交的SHA和（git中特定提交的唯一标识哈希值）附在代码上也很有用。我们将进一步讨论版本问题[在本章节稍后](/en/part11/keeping_green#versioning)。

<!-- It is even more useful if we combine the version information with a history of all releases. If, for example, we found out that a particular commit has introduced a bug, we can find out exactly when that was released and how many users were affected. This is especially useful when that bug has written bad data to the database. We'd now be able to track where that bad data went based on the time.-->
 如果我们把版本信息和所有版本的历史结合起来，就更有用了。例如，如果我们发现某个特定的提交引入了一个bug，我们就可以准确地找出这个bug是什么时候发布的，有多少用户受到影响。当这个bug在数据库中写入坏数据时，这就特别有用。我们现在就可以根据时间来追踪这些坏数据的去向。

### Types of CI setup

<!-- To meet some of the requirements listed above, we want to dedicate a separate server for running the tasks in continuous integration. Having a separate server for the purpose minimizes the risk that something else interferes with the CI/CD process and causes it to be unpredictable.-->
 为了满足上面列出的一些要求，我们想用一个单独的服务器来运行持续集成的任务。有一个单独的服务器用于此目的，可以最大限度地减少其他东西干扰CI/CD过程并导致其不可预测的风险。

<!-- There are two options: host our own server or use a cloud service.-->
有两种选择：托管我们自己的服务器或使用云服务。

#### Jenkins (and other self-hosted setups)

<!-- Among the self-hosted options, [Jenkins](https://www.jenkins.io/) is the most popular. It's extremely flexible and-->
在自我托管的选项中，[Jenkins](https://www.jenkins.io/)是最受欢迎的。它非常灵活，而且
<!-- there are plugins for almost anything (except that one thing you want to do). This is a great option for many applications, using a self-hosted setup means that the entire environment is under your control, the number of resources can be controlled, secrets (we'll elaborate a little more on security in later sections of this part) are never exposed to anyone else and you can do anything you want on the hardware.-->
有几乎任何东西的插件（除了你想做的那件事情）。这对许多应用来说是一个很好的选择，使用自我托管的设置意味着整个环境在你的控制之下，资源的数量可以被控制，秘密（我们将在这一部分的后面部分详细说明安全问题）永远不会暴露给其他人，你可以在硬件上做任何你想做的事情。

<!-- Unfortunately, there is also a downside. Jenkins is quite complicated to set up. It's very flexible but that means that there's often quite a bit of boilerplate/template code involved to get builds working. With Jenkins specifically, it also means that CI/CD must be set up with Jenkins' own domain-specific language. There are also the risks of hardware failures which can be an issue if the setup sees heavy use.-->
 不幸的是，也有一个坏处。Jenkins的设置相当复杂。它非常灵活，但这意味着通常需要相当多的模板/模版代码来实现构建工作。具体到Jenkins，这也意味着CI/CD必须用Jenkins自己的特定领域语言进行设置。还有硬件故障的风险，如果设置被大量使用，这可能是一个问题。

<!-- With self-hosted options, the billing is usually based on the hardware. You pay for the server. What you do on the server doesn't change the billing.-->
 对于自我托管的选项，计费通常是基于硬件的。你为服务器付费。你在服务器上做什么并不改变计费。

#### GitHub Actions and other cloud-based solutions

<!-- In a cloud-hosted setup, the setup of the environment is not something you need to worry about. It's there, all you need to do is tell it what to do. Doing that usually involves putting a file in your repository and then telling the CI system to read the file (or to check your repository for that particular file).-->
 在云托管的设置中，环境的设置不是你需要担心的事情。它就在那里，你所要做的就是告诉它该做什么。这样做通常包括在你的版本库中放置一个文件，然后告诉CI系统读取该文件（或者检查你的版本库中的特定文件）。

<!-- The actual CI config for the cloud-based options is often a little simpler, at least if you stay within what is considered "normal" usage. If you want to do something a little bit more special, then cloud-based options may become more limited, or you may find it difficult to do that one specific task for which the cloud platform just isn't built for.-->
 基于云的选项的实际CI配置通常要简单一些，至少如果你保持在被认为是 "正常 "的使用范围内。如果你想做一些更特别的事情，那么基于云的选项可能会变得更加有限，或者你会发现很难完成云平台不适合的特定任务。

<!-- In this part, we'll look at a fairly normal use case. The more complicated setups might, for example, make use of specific hardware resources, e.g. a GPU.-->
 在这一部分，我们将看看一个相当正常的使用案例。更复杂的设置可能，例如，利用特定的硬件资源，例如，GPU。

<!-- Aside from the configuration issue mentioned above, there are often resource limitations on cloud-based platforms. In a self-hosted setup, if a build is slow, you can just get a bigger server and throw more resources at it. In cloud-based options, this may not be possible. For example, in [GitHub Actions](https://github.com/features/actions), the nodes your builds will run on have 2 vCPUs and 8GB of RAM.-->
 除了上面提到的配置问题外，基于云的平台上通常有资源限制。在自我托管的设置中，如果构建速度慢，你可以得到一个更大的服务器，并在它身上投入更多资源。在基于云的选项中，这可能是不可能的。例如，在[GitHub Actions](https://github.com/features/actions)中，你的构建将运行在2个vCPUs和8GB内存的节点上。

<!-- Cloud-based options are also usually billed by build time which is something to consider.-->
 基于云的选项通常也是按构建时间计费的，这是需要考虑的问题。

#### Why pick one over the other

<!-- In general, if you have a small to medium software project that doesn't have any special requirements (e.g. a need for a graphics card to run tests), a cloud-based solution is probably best. The configuration is simple and you don't need to go to the hassle or expense of setting up your own system. For smaller projects especially, this should be cheaper.-->
 一般来说，如果你有一个中小型的软件项目，没有任何特殊的要求（例如需要一个图形卡来运行测试），基于云的解决方案可能是最好的。配置很简单，你不需要为建立你自己的系统而费心费力。特别是对于较小的项目，这应该是比较便宜的。

<!-- For larger projects where more resources are needed or in larger companies where there are multiple teams and projects to take advantage of it, a self-hosted CI setup is probably the way to go.-->
 对于需要更多资源的大型项目，或者在有多个团队和项目需要利用它的大公司，自我托管的CI设置可能是最好的方式。

#### Why use GitHub Actions for this course

<!-- For this course, we'll use [GitHub Actions](https://github.com/features/actions). It is an obvious choice since we're using GitHub anyway. We can get a robust CI solution working immediately without any hassle of setting up a server or configuring a third-party cloud-based service.-->
 对于本课程，我们将使用[GitHub Actions](https://github.com/features/actions)。这是一个明显的选择，因为我们无论如何都要使用GitHub。我们可以立即得到一个强大的CI解决方案，而不需要设置服务器或配置第三方的云服务。

<!-- Besides being easy to take into use, GitHub Actions is a good choice in other respects. It might be the best cloud-based solution at the moment. It has gained lots of popularity since its initial release in November 2019.-->
 除了易于使用，GitHub Actions在其他方面也是一个不错的选择。它可能是目前最好的基于云的解决方案。自2019年11月首次发布以来，它已经获得了很多人气。

</div>

<div class="tasks">

### Exercise 11.1

<!-- Before getting our hands dirty with setting up the CI/CD pipeline let us reflect a bit on what we have read.-->
在我们动手设置CI/CD管道之前，让我们对我们所读的内容进行一下思考。

#### 11.1 Warming up

<!-- Think about a hypothetical situation where we have an application being worked on by a team of about 6 people. The application is in active development and will be released soon.-->
 想一想一个假设的情况，我们有一个由大约6个人组成的团队正在开发的应用。该应用正在积极开发中，并将很快发布。

<!-- Let us assume that the application is coded with some other language than JavaScript/TypeScript, e.g. in  Python, Java, or Ruby. You can freely pick the language. This might even be a language you do not know much yourself.-->
 让我们假设这个应用是用JavaScript/TypeScript以外的其他语言编码的，例如用Python、Java或Ruby。你可以自由选择语言。这甚至可能是一种你自己都不太了解的语言。

<!-- Write a short text, say 200-300 words, where you answer or discuss some of the points below. You can check the length with https://wordcounter.net/. Save your answer to the file named <i>exercise1.md</i> in the root of the repository that you shall create in [exercise 11.2](/en/part11/getting_started_with_git_hub_actions#exercise-11-2).-->
 写一篇短文，比如200-300字，在其中回答或讨论下面的一些观点。你可以用https://wordcounter.net/ 来检查长度。把你的答案保存在你将在[练习11.2](/en/part11/getting_started_with_git_hub_actions#exercise-11-2)中创建的版本库的根目录下，名为<i>exercise1.md</i>。

<!-- The points to discuss:-->
 要讨论的要点。
<!-- - Some common steps in a CI setup include <i>linting</i>, <i>testing</i>, and <i>building</i>. What are the specific tools for taking care of these steps in the ecosystem of the language you picked? You can search for the answers by google.-->
 - CI设置中的一些常见步骤包括<i>linting</i>、<i>testing</i>和<i>building</i>。在你选择的语言的生态系统中，照顾这些步骤的具体工具是什么？你可以通过谷歌搜索答案。
<!-- - What alternatives are there to set up the CI besides Jenkins and GitHub Actions? Again, you can ask google!-->
 - 除了Jenkins和GitHub Actions之外，还有什么其他方法来设置CI？同样，你可以问google!
<!-- - Would this setup be better in a self-hosted or a cloud-based environment? Why? What information would you need to make that decision?-->
 - 这样的设置在自我托管或基于云的环境中会更好吗？为什么？你需要什么信息来做这个决定？

<!-- Remember that there are no 'right' answers to the above!-->
 请记住，上述问题没有"正确"的答案!

</div>
