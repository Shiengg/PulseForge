.PHONY: up down reset logs ps

up:
	docker compose up --build -d

down:
	docker compose down

stop:
	docker compose stop

reset:
	docker compose down -v --remove-orphans
	docker compose up --build -d

logs:
	docker compose logs -f

ps:
	docker compose ps
