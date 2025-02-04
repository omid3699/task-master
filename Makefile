createvenv:
	@virtualenv .venv

test:
	@.venv/bin/python manage.py test

makemig: 
	@.venv/bin/python manage.py makemigrations

migrate: test
	@.venv/bin/python manage.py migrate

run:
	@.venv/bin/python manage.py runserver

createuser:
	@.venv/bin/python manage.py createsuperuser

shell:
	@.venv/bin/python manage.py shell

clean:
	@rm db.sqlite3

freezedeps:
	@.venv/bin/pip freeze > requirements.txt

installdeps:
	@.venv/bin/pip install -r requirements.txt


.PHONY: test makemig migrate run createuser shell clean installdeps freezedeps