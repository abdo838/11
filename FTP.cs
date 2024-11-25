using System;
using System.IO;
using System.Net;
using UnityEngine;

public class FTPDownloader : MonoBehaviour
{
    public string ftpHost = "ftp.infinityfree.com";  // اسم المضيف
    public int ftpPort = 21;                        // المنفذ
    public string ftpUsername = "if0_37699489";     // اسم المستخدم
    public string ftpPassword = "VaGWEuaSoh";       // كلمة المرور
    public string ftpPath = "/htdocs";             // مسار المجلد
    public string remoteFile = "index.cs";         // اسم ملف C# البعيد

    void Start()
    {
        StartCoroutine(DownloadAndAttachScript());
    }

    System.Collections.IEnumerator DownloadAndAttachScript()
    {
        // بناء رابط FTP
        string ftpUrl = $"ftp://{ftpHost}:{ftpPort}{ftpPath}/{remoteFile}";

        // تحقق من صحة URL
        Uri uriResult;
        bool isValidUri = Uri.TryCreate(ftpUrl, UriKind.Absolute, out uriResult) && uriResult.Scheme == Uri.UriSchemeFtp;
        if (!isValidUri)
        {
            Debug.LogError("Invalid FTP URL.");
            yield break;
        }

        // إعداد طلب FTP
        FtpWebRequest request = (FtpWebRequest)WebRequest.Create(ftpUrl);
        request.Method = WebRequestMethods.Ftp.DownloadFile;
        request.Credentials = new NetworkCredential(ftpUsername, ftpPassword);

        try
        {
            string scriptContent;
            using (FtpWebResponse response = (FtpWebResponse)request.GetResponse())
            using (Stream responseStream = response.GetResponseStream())
            using (StreamReader reader = new StreamReader(responseStream))
            {
                scriptContent = reader.ReadToEnd(); // قراءة محتوى الملف
                Debug.Log("Script content downloaded successfully.");
            }

            // حفظ الملف محليًا للتأكد من صحة التحميل
            string localPath = Path.Combine(Application.persistentDataPath, remoteFile);
            File.WriteAllText(localPath, scriptContent);
            Debug.Log("Script saved to: " + localPath);

            // ** ملاحظة **: يجب استخدام مكتبة مثل Roslyn لتحويل الكود النصي إلى Component وإضافته.
            Debug.LogWarning("Dynamic compilation and component addition require advanced libraries like Roslyn.");
        }
        catch (Exception ex)
        {
            Debug.LogError("Error downloading or processing the file: " + ex.Message);
        }

        yield return null;
    }
}
