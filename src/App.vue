<template>
	<GlobalProvider>
		<div class="todoapp">
			<h1 class="todoapp__title">todos</h1>
			<div class="todoapp__content">
				<TodoHeader />
				<TodoList />
				<TodoFooter />
			</div>
			<ErrorNotification />
		</div>
	</GlobalProvider>
</template>
