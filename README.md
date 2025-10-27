# 🧠 Puppeteer MCP Server

> A lightweight, Dockerized HTTP server that runs Puppeteer in headless mode and exposes a Model Context Protocol (MCP)-compatible interface for use with `mcpo` and OpenWebUI environments.

---

## 🚀 Features

- 📸 **Screenshot endpoint** via Puppeteer (headless Chromium)
- 🔌 **HTTP API** compatible with the MCP protocol
- 🧾 **OpenAPI schema** served at `/schema.json`
- 🐳 Runs in a self-contained **Docker container**
- 🔁 Ready for integration with `mcpo` in OpenWebUI

---

## 🧱 Stack

- Node.js 20 (Alpine)
- Puppeteer 23+
- Express.js
- Docker & docker-compose

---

## 📦 API Endpoints

### `GET /schema.json`

Returns the MCP-compatible OpenAPI schema for client discovery.

### `POST /screenshot`

**Request:**
```json
{
  "url": "https://example.com"
}
```

**Response:**
- `200 OK` – PNG image of the captured web page

---

## 🐳 Docker Usage

### Build and run:

```bash
docker compose build --no-cache
docker compose up
```

The service will be available at:

```
http://localhost:9555
```

### Test screenshot endpoint:

```bash
curl -X POST http://localhost:9555/screenshot \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com"}' --output screenshot.png
```

---

## 🔐 Environment Variables

| Variable                     | Default Value                  | Description                          |
|-----------------------------|--------------------------------|--------------------------------------|
| `PUPPETEER_EXECUTABLE_PATH` | `/usr/bin/chromium-browser`    | Path to Chromium binary              |

---

## 🧪 Healthcheck

The Docker container includes a healthcheck that pings `/schema.json` to verify server status.

---

## 📁 Project Structure

```
.
├── Dockerfile
├── docker-compose.yml
├── package.json
├── package-lock.json
├── server.js
├── schema.json
└── .gitignore
```

---

## 📈 Évolutions à venir

✅ = fait  
🟡 = en cours / prévu

- ✅ Dockerisation légère et reproductible
- ✅ MCP `schema.json` exposé
- ✅ Screenshot via `POST /screenshot`
- 🟡 Ajouter `/pdf` pour exporter les pages en PDF
- 🟡 Ajouter `/html` pour retourner le DOM complet
- 🟡 Support `@modelcontextprotocol/sdk` (si disponible)
- 🟡 Ajout d’un endpoint `GET /` (status/info)
- 🟡 Ajout d’un mode batch (multi-URLs)
- 🟡 Ajout d’un système de logs JSON structurés
- 🟡 Intégration Redis ou file d’attente (longues tâches)
- 🟡 Build automatique d’image Docker GHCR
- 🟡 Ajout de tests unitaires + CI GitHub Actions

---

## 📜 License

MIT — do what you want 🤝  
Maintained by [@gamersalpha](https://github.com/gamersalpha)
